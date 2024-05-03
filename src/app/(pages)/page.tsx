import FirstBox from "../components/FirstBox";
import SecondBox from "../components/SecondBox";

const Home = () => {
  
  return (
    <div className="flex gap-10 flex-col min-h-screen md:py-5 md:px-32 ">
      <FirstBox />
      <SecondBox />
      {/* <ThirdBox /> */}
    </div>
  );
};

export default Home;
