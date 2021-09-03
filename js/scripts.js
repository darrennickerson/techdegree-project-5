fetch("https://randomuser.me/api/?results=12")
  .then((res) => console.log(res))
  .catch((error) => console.log("something went wrong", error));
