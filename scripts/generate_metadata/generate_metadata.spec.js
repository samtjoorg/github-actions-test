import { generateMetadata, writeFile } from "./generate_metadata";

const fs = require("fs");

jest.mock("fs");

const mockNpmVersions = {
  versions: {
    "93.0.0": {},
    "94.0.0": {},
    "95.0.0": {},
    "96.0.0": {},
    "97.0.0": {},
  },
};

const mockMetadata = {
  versions: {
    "v97.0.0": "https://carbon.sage.com/archive/v97.0.0/index.html",
    "v96.0.0": "https://carbon.sage.com/archive/v96.0.0/index.html",
    "v95.0.0": "https://carbon.sage.com/archive/v95.0.0/index.html",
  },
};

describe("generateMetadata script", () => {
  let consoleErrorMock;

  beforeAll(() => {
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    consoleErrorMock = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(mockNpmVersions));
    fs.mkdirSync = jest.fn((path, options, callback) => {
      callback();
    });
    fs.writeFileSync = jest.fn((path, json, callback) => {
      callback();
    });
  });

  afterAll(() => {
    global.console.log.mockReset();
    global.console.error.mockReset();
  });

  it("should create a metadata.json file in a metadata directory", async () => {
    await generateMetadata();

    expect(fs.mkdirSync).toHaveBeenCalledWith(
      "metadata",
      {},
      expect.any(Function)
    );

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "metadata/metadata.json",
      JSON.stringify(mockMetadata),
      expect.any(Function)
    );
  });

  describe("when there is an error creating the metadata directory", () => {
    it("should throw an error", () => {
      fs.mkdirSync = jest.fn((path, options, callback) => {
        callback(new Error("An error occurred."));
      });

      expect(() => {
        writeFile();
      }).toThrowError("An error occurred.");
    });
  });

  describe("when there is an error creating the metadata.json file", () => {
    it("should throw an error", () => {
      fs.writeFileSync = jest.fn((path, json, callback) => {
        callback(new Error("An error occurred."));
      });

      expect(() => {
        writeFile();
      }).toThrowError("An error occurred.");
    });
  });

  describe("when there is an error fetching the carbon data from npm", () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error(`process.exit: ${number}`);
      });

    it("should throw an error with exit code 1", async () => {
      fetch.mockResponse(JSON.stringify(mockNpmVersions), {
        status: 500,
        ok: false,
      });

      await expect(async () => {
        await generateMetadata();
      }).rejects.toThrowError("process.exit: 1");
      expect(consoleErrorMock).toHaveBeenCalledWith(
        new Error("Failed to fetch from npm with HTTP error code 500")
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });
});
