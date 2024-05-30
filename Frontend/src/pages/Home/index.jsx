import React from "react";
import { Banner, Navbar } from "../../components";
import About from "../About";
import Contact from "../Contact";

const Home = () => {
 
    return (
        <>
            <div className="dark:bg-boxdark">
                <Navbar />
                <Banner />
                <About />
                <Contact />
            </div>
        </>
    );
};

export default Home;

// import React from "react";
// import { Banner, Navbar } from "../../components";
// import About from "../About";
// import Contact from "../Contact";

// const Home = () => {
//     return (
//         <>
//             <div className="dark:bg-boxdark">
//                 <Navbar />
//                 <Banner />
//                 <About />
//                 <Contact />
//                 {/* {window.addEventListener("chainlit-call-fn", (e) => {
//                     const { name, args, callback } = e.detail;
//                     if (name === "test") {
//                         console.log(name, args);
//                         callback("You sent: " + args.msg);
//                     }
//                 })
//                 } */}
//             </div>
//         </>
//     );
// };

// export default Home;
