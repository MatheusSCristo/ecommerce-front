export default(rating: number) => {
    const array = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      array.push("full");
    }
    if (rating - Math.floor(rating) > 0) {
      array.push("half");
    }
    return array;
  };