import React from "react";
import { Navbar } from "../components/Navbar";
import image1 from "../images/image1.avif";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import { Footer } from "../components/Footer";
import { useStateContext } from "../ContextProvider";

export const Home = () => {
  const { notification, setNotification } = useStateContext();

  return (
    <>
      <Navbar />

      {notification && (
        <div className="notification fadeInDown">{notification}</div>
      )}

      <div className="header">
        <h1>VEINS</h1>
        <h2>Connecting blood donors with recipients.</h2>
      </div>

      <div className="features">
        <div className="feature">
          <div className="text">
            <h2>Eliminating obstacles in emergencies</h2>
            <p>
              Our automated blood donation system works efficiently whenever
              someone needs a blood transfusion. As soon as a new blood request
              is raised, it is routed among our local volunteer blood donors. We
              know time matters! So we keep you updated with real-time
              notifications sent directly to you via SMS (text message) or the
              installed mobile app.
            </p>
          </div>
          <img src={image1} />
        </div>
        <div className="feature">
          <div className="text">
            <h2>What could you do?</h2>
            <p>
              In as little as few minutes, you can become someones unnamed,
              unknown, but all-important hero. Saving a life is noble work that
              starts very simply and easily. You can join our cause in a variety
              of ways. Every form of contribution you make is important, valued
              and essential in our shared mission to save lives. Register now
              and enroll as a blood donor. A financial donation can also help
              save lives.
            </p>
          </div>
          <img src={image2} />
        </div>
        <div className="feature">
          <div className="text">
            <h2>
              No one should stress or even die from a blood shortage in Lebanon
            </h2>
            <p>
              Much blood has been wasted in the streets of Lebanon throughout
              its history. Yet, blood banks are almost empty and families of
              patients in need of blood struggle to find potential donors, every
              day. The pressure of finding blood for a loved one is an added
              burden the families should not bear alone. Our mission is to
              improve the anonymous and voluntary blood donation system in
              Lebanon, and for that, we created a movement.
            </p>
          </div>
          <img src={image3} />
        </div>
      </div>

      <Footer />
    </>
  );
};
