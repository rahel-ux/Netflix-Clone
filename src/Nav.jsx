import { useState, useEffect } from "react";

const Nav = () => {
  const [show, setShow] = useState(false);
  const changeBgColor = () =>
    window.scrollY > 100 ? setShow(true) : setShow(false);

  useEffect(() => {
    window.addEventListener("scroll", changeBgColor);
    return;
    () => {
      window.removeEventListener("scroll", changeBgColor);
    },
      [show];
  });
  //   transition-colors duration-300 ease-in-outnpm 
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full ${show && "bg-black opacity-80 transition-colors duration-300 ease-in-out"}`}
      >
        <div className="flex justify-between items-center">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="logo"
            className="h-[80px] object-contain cursor-pointer"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
            className="h-[30px] object-contain cursor-pointer select-none mr-3"
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
