import { Link } from "react-router-dom";
import bg1 from "@/assets/images/bg/01.jpg";
import bg2 from "@/assets/images/bg/02.jpg";
import Select from "react-select";
import CountUp from "react-countup";
import Navbar from "@/features/core/presentation/components/navbar";
import Client from "@/features/core/presentation/components/client";
import Footer from "@/features/core/presentation/components/footer";
import Switcher from "@/features/core/presentation/components/switcher";
import { Carousel } from "react-responsive-carousel";
import "../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { counterData, properties, teamdata } from "@/features/core/domain/data";
import { useState } from "react";
import About from "@/features/core/presentation/components/about";
import GetInTouch from "@/features/core/presentation/components/getInTouch";
import Feature from "@/features/core/presentation/components/feature";
import {
  LuSearch,
  RxHome,
  AiOutlineDollarCircle,
  LiaCompressArrowsAltSolid,
  BiBed,
  LiaBathSolid,
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "@/assets/icons/vander";

const Houses = [
  { value: "AF", label: "Apartment" },
  { value: "AZ", label: " Offices" },
  { value: "BS", label: "Townhome" },
];
const minPrice = [
  { value: "1", label: "500" },
  { value: "2", label: "1000" },
  { value: "3", label: "2000" },
  { value: "4", label: "3000" },
  { value: "5", label: "4000" },
  { value: "5", label: "5000" },
  { value: "5", label: "6000" },
];
const maxPrice = [
  { value: "1", label: "500" },
  { value: "2", label: "1000" },
  { value: "3", label: "2000" },
  { value: "4", label: "3000" },
  { value: "5", label: "4000" },
  { value: "5", label: "5000" },
  { value: "5", label: "6000" },
];

const HomePage = () => {
  const [activeTabIndex, setActiveIndex] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveIndex(tabIndex);
  };

  return (
    <>
      <Navbar navClass="navbar-white" />
      <section className="swiper-slider-hero relative block h-screen" id="home">
        <Carousel
          //@ts-expect-error lkljldasj
          style={{ height: "100%" }}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
        >
          <div
            className="swiper-slide flex items-center overflow-hidden"
            style={{ height: "100%" }}
          >
            <div
              className="slide-inner absolute end-0 top-0 w-full h-full slide-bg-image flex items-center bg-center"
              style={{ backgroundImage: `url(${bg1})`, height: "100%" }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="container relative">
                <div className="grid grid-cols-1">
                  <div className="text-center">
                    <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
                      Easy way to find your <br /> dream property
                    </h1>
                    <p className="text-white/70 text-xl max-w-xl mx-auto">
                      A great plateform to buy, sell and rent your properties
                      without any agent or commisions.
                    </p>

                    <div className="mt-6">
                      <Link
                        to=""
                        className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide flex items-center overflow-hidden">
            <div
              className="slide-inner absolute end-0 top-0 w-full h-full slide-bg-image flex items-center bg-center"
              style={{ backgroundImage: `url(${bg2})` }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="container relative">
                <div className="grid grid-cols-1">
                  <div className="text-center">
                    <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
                      We will help you find <br /> your Wonderful home
                    </h1>
                    <p className="text-white/70 text-xl max-w-xl mx-auto">
                      A great plateform to buy, sell and rent your properties
                      without any agent or commisions.
                    </p>

                    <div className="mt-6">
                      <Link
                        to=""
                        className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </section>

      <section className="relative md:pb-24 pb-16">
        <div className="container relative z-1">
          <div className="grid grid-cols-1 justify-center">
            <div className="relative md:-mt-52 -mt-40">
              <div className="grid grid-cols-1">
                <ul
                  className="inline-block mx-auto sm:w-fit w-full flex-wrap justify-center text-center p-4 mt-10 bg-white dark:bg-slate-900 rounded-t-xl border-b dark:border-gray-800"
                  id="myTab"
                  data-tabs-toggle="#StarterContent"
                  role="tablist"
                >
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 0
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="buy-home-tab"
                      data-tabs-target="#buy-home"
                      type="button"
                      role="tab"
                      aria-controls="buy-home"
                      aria-selected="true"
                    >
                      Buy
                    </button>
                  </li>
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(1)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 1
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="sell-home-tab"
                      data-tabs-target="#sell-home"
                      type="button"
                      role="tab"
                      aria-controls="sell-home"
                      aria-selected="false"
                    >
                      Sell
                    </button>
                  </li>
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(2)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 2
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="rent-home-tab"
                      data-tabs-target="#rent-home"
                      type="button"
                      role="tab"
                      aria-controls="rent-home"
                      aria-selected="false"
                    >
                      Rent
                    </button>
                  </li>
                </ul>

                <div
                  id="StarterContent"
                  className="p-6 bg-white dark:bg-slate-900 md:rounded-xl rounded-none shadow-md dark:shadow-gray-700"
                >
                  {activeTabIndex === 0 && (
                    <div
                      id="buy-home"
                      role="tabpanel"
                      aria-labelledby="buy-home-tab"
                    >
                      <form action="#">
                        <div className="registration-form text-dark text-start">
                          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                            <div>
                              <label className="form-label text-slate-900 dark:text-white font-medium">
                                Search : <span className="text-red-600">*</span>
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <LuSearch className="icons" />
                                <input
                                  name="name"
                                  type="text"
                                  id="job-keyword"
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  placeholder="Search your Keywords"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-properties"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Select Categories:
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <RxHome className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={Houses}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-min-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Min Price :
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <LuSearch className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={minPrice}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-max-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Max Price :
                              </label>
                              <div className="filter-search-form relative mt-2">
                                <LuSearch className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={maxPrice}
                                />
                              </div>
                            </div>

                            <div className="lg:mt-6">
                              <input
                                type="submit"
                                id="search-buy"
                                name="search"
                                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                                value="Search"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {activeTabIndex === 1 && (
                    <div
                      id="sell-home"
                      role="tabpanel"
                      aria-labelledby="sell-home-tab"
                    >
                      <form action="#">
                        <div className="registration-form text-dark text-start">
                          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                            <div>
                              <label className="form-label text-slate-900 dark:text-white font-medium">
                                Search : <span className="text-red-600">*</span>
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <LuSearch className="icons" />
                                <input
                                  name="name"
                                  type="text"
                                  id="job-keyword"
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  placeholder="Search your Keywords"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-properties"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Select Categories:
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <RxHome className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={Houses}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-min-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Min Price :
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <AiOutlineDollarCircle className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={minPrice}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-max-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Max Price :
                              </label>
                              <div className="filter-search-form relative mt-2">
                                <AiOutlineDollarCircle className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={maxPrice}
                                />
                              </div>
                            </div>

                            <div className="lg:mt-6">
                              <input
                                type="submit"
                                id="search-buy"
                                name="search"
                                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                                value="Search"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {activeTabIndex === 2 && (
                    <div
                      id="rent-home"
                      role="tabpanel"
                      aria-labelledby="rent-home-tab"
                    >
                      <form action="#">
                        <div className="registration-form text-dark text-start">
                          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                            <div>
                              <label className="form-label text-slate-900 dark:text-white font-medium">
                                Search : <span className="text-red-600">*</span>
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <LuSearch className="icons" />
                                <input
                                  name="name"
                                  type="text"
                                  id="job-keyword"
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  placeholder="Search your Keywords"
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-properties"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Select Categories:
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <RxHome className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={Houses}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-min-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Min Price :
                              </label>
                              <div className="filter-search-form relative filter-border mt-2">
                                <AiOutlineDollarCircle className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={minPrice}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="buy-max-price"
                                className="form-label text-slate-900 dark:text-white font-medium"
                              >
                                Max Price :
                              </label>
                              <div className="filter-search-form relative mt-2">
                                <AiOutlineDollarCircle className="icons" />
                                <Select
                                  className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                  options={maxPrice}
                                />
                              </div>
                            </div>

                            <div className="lg:mt-6">
                              <input
                                type="submit"
                                id="search-buy"
                                name="search"
                                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                                value="Search"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <About />

        <Feature />

        <div className="container relative lg:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Featured Properties
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              A great plateform to buy, sell and rent your properties without
              any agent or commisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] mt-8">
            {properties.map((item, index) => (
              <div
                key={index}
                className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl"
              >
                <div className="md:flex">
                  <div className="relative md:shrink-0">
                    <img
                      className="h-full w-full object-cover md:w-48"
                      src={item.image}
                      alt=""
                    />
                    <div className="absolute top-4 end-4">
                      <Link
                        to="#"
                        className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"
                      >
                        <i className="mdi mdi-heart mdi-18px"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="md:pb-4 pb-6">
                      <Link
                        to={`/property-detail/${item.id}`}
                        className="text-lg hover:text-green-600 font-medium ease-in-out duration-500"
                      >
                        10765 Hillshire Ave, Baton Rouge, LA 70810, USA
                      </Link>
                    </div>

                    <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                      <li className="flex items-center me-4">
                        <LiaCompressArrowsAltSolid className="text-2xl me-2 text-green-600" />
                        <span>{item.square}sqf</span>
                      </li>

                      <li className="flex items-center me-4">
                        <BiBed className="text-2xl me-2 text-green-600" />
                        <span>{item.beds} Beds</span>
                      </li>

                      <li className="flex items-center">
                        <LiaBathSolid className="text-2xl me-2 text-green-600" />
                        <span>{item.baths} Baths</span>
                      </li>
                    </ul>

                    <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                      <li>
                        <span className="text-slate-400">Price</span>
                        <p className="text-lg font-medium">${item.price}</p>
                      </li>

                      <li>
                        <span className="text-slate-400">Rating</span>
                        <ul className="text-lg font-medium text-amber-400 list-none">
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1 text-black dark:text-white">
                            {item.rating}(30)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:flex justify-center text-center mt-6">
            <div className="md:w-full">
              <Link
                to="/list"
                className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500"
              >
                View More Properties <FiArrowRight className="ms-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="container relative lg:mt-24 mt-16 lg:pt-24 pt-16">
          <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.png')] bg-no-repeat bg-center bg-cover"></div>
          <div className="relative grid grid-cols-1 pb-8 text-center z-1">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Trusted by more than 10K users
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              A great plateform to buy, sell and rent your properties without
              any agent or commisions.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
            {counterData.map((item, index) => {
              return (
                <div className="counter-box text-center" key={index}>
                  <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white">
                    <CountUp start={0} end={Number(item.target)} />+
                  </h1>
                  <h5 className="counter-head text-lg font-medium">
                    {item.title}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container relative lg:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Meet The Agent Team
            </h3>

            <p className="text-slate-400 max-w-xl mx-auto">
              A great plateform to buy, sell and rent your properties without
              any agent or commisions.
            </p>
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
            {teamdata.map((item, index) => {
              return (
                <div className="lg:col-span-3 md:col-span-6" key={index}>
                  <div className="group text-center">
                    <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                      <img src={item.image} className="" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                      <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                        <li className="inline ms-1">
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"
                          >
                            <FiFacebook className="h-4 w-4" />
                          </Link>
                        </li>
                        <li className="inline ms-1">
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"
                          >
                            <FiInstagram className="h-4 w-4" />
                          </Link>
                        </li>
                        <li className="inline ms-1">
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"
                          >
                            <FiLinkedin className="h-4 w-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="content mt-3">
                      <Link
                        to="#"
                        className="text-xl font-medium hover:text-green-600 transition-all duration-500 ease-in-out"
                      >
                        {item.name}
                      </Link>
                      <p className="text-slate-400">{item.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Client />

        <GetInTouch />
      </section>
      <Footer />
      <Switcher />
    </>
  );
};

export default HomePage;
