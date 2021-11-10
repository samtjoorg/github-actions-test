const fetchData = () => {
  fetch(
    "https://carbon-versioned.s3.eu-west-1.amazonaws.com/metadata/metadata.json"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Data", data);
    });

  return [
    {
      id: "1.5.0",
      title: "1.5.0",
      onClick: () => {
        change({ selected: value });
      },
      value: "test",
      right: undefined,
      active: false,
      href:
        "https://carbon-versioned.s3.eu-west-1.amazonaws.com/archive/1.5.0/index.html",
      target: "_blank",
    },
    {
      id: "1.4.1",
      title: "1.4.1",
      onClick: () => {
        change({ selected: value });
      },
      value: "test",
      right: undefined,
      active: false,
      href:
        "https://carbon-versioned.s3.eu-west-1.amazonaws.com/archive/1.4.1/index.html",
      target: "_blank",
    },
  ];
};

export default fetchData;
