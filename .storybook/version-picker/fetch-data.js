const fetchData = async () => {
  const response = await fetch(
    "https://carbon-versioned.s3.eu-west-1.amazonaws.com/metadata/metadata.json"
  );

  const versions = await response.json();

  return versions;
};

export default fetchData;
