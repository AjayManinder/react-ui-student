import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="text-overlay">
        <h1>Welcome to College Portal</h1>
        <p>
          Innovative school that offers a high-quality education while remaining
          one of the most affordable universities in the country.
        </p>
      </div>

      <div className="homeView-container">
        <div className="containerHome-1">
          <div className="item1">
            <img
              src="https://t3.ftcdn.net/jpg/04/18/52/88/360_F_418528804_xgyFvVsMSHeWk1UgDtR9aoccqSC7BrHy.jpg"
              alt="image1"
              className="container1-image"
            />
            <div className="container1-text">VISION</div>
          </div>
          <div className="item1">
            <img
              src="https://t3.ftcdn.net/jpg/03/04/26/00/360_F_304260079_AwyXBUBSjjReWi8QBd7twbQyzpDsurUv.jpg"
              alt="image1"
              className="container1-image"
            />
            <div className="container1-text">MISSION</div>
          </div>
          <div className="item1">
            <img
              src="https://c8.alamy.com/compfr/e929h6/tableau-strategie-e929h6.jpg"
              alt="image1"
              className="container1-image"
            />
            <div className="container1-text">STRATEGY</div>
          </div>
        </div>

        <div className="afterHomeView-containerText">
          <h2>University Mission, Vision and Values</h2>
          <h3> Who We Are</h3>
          <h5>
            The University believes its responsibility is to enrich each
            student’s perspective through a cumulative experience that starts
            with academic rigor and integrates applied learning and
            servant-leadership opportunities. Our model of continuous learning
            allows each student to find and fulfill his or her own sense of
            purpose. By engaging students with multiple sources of learning and
            creating a dynamic environment that encourages individuals to find
            their passions and reach beyond themselves, UCM prepares students by
            giving them knowledge and experiences that broaden and deepen their
            education so they may flourish in a world of accelerated change.
          </h5>
        </div>

        <div className="container2">
          <div className="item2">
            <div className="container2-text">
              Graduate <br /> Opportunities
            </div>
          </div>
          <div className="item2">
            <div className="container2-text">
              Under-Grad <br /> Opportunities{" "}
            </div>
          </div>
          <div className="item2">
            <div className="container2-text">Addmissions</div>
          </div>
          <div className="item2">
            <div className="container2-text">
              Student <br /> Services
            </div>
          </div>
          <div className="item2">
            <div className="container2-text">Master's Program</div>
          </div>
          <div className="item2">
            <div className="container2-text">Housing</div>
          </div>
        </div>
        <div className="afterHomeView-containerText">
          <h2>International Student Services</h2>
          <h5>
            We are committed to providing a safe and welcoming environment for
            all international students. Our International Student Services (ISS)
            team is here to help you with everything from applying for a visa to
            finding housing and getting involved on campus.
            <br />
            <br />
            We also offer a variety of programs and services to help you succeed
            in your education and beyond.
          </h5>
        </div>

        <div className="container3">
          <div className="item3 left-item3">
            <img
              src="https://www.volstate.edu/sites/default/files/styles/mt_fli_image/public/2017-09/VS-Students-Campus_8-31-177.jpg?itok=jDVEKlzi"
              alt="image1"
              className="container3-image"
            />
          </div>
          <div className="item3 right-item3">
            <h2>Campus Life</h2>
            <h6>
              Our campus is a place for students to live, learn and grow. We
              offer a variety of programs and services to help students succeed
              in their education and beyond.
              <br />
              <br /> Campus life here is active and creative, fun and fantastic.
              You’ll literally have hundreds of opportunities to get
              involved—from student organizations to academic teams, to
              sororities and fraternities, athletics to intramural and club
              sports.
            </h6>
          </div>
        </div>

        <div className="container3">
          <div className="item3 right-item3">
            <h2>Our Mission, Vision, and Strategic Plan</h2>
            <h6>
              Mission & Vision - disseminates knowledge that transforms students
              into leaders who possess the aptitudes, skills and confidence to
              succeed.
              <br />
              <br />
              Strategic Plan - Taking a forward-looking approach in a new era in
              higher education, We developed a new strategic plan in 2019.
            </h6>
          </div>
          <div className="item3 left-item3">
            <img
              src="https://www.hccs.edu/media/houston-community-college/district/images/GettyImages-1321462048.jpg"
              alt="image1"
              className="container3-image"
            />
          </div>
        </div>

        <div className="container3">
          <div className="item3 left-item3">
            <img
              src="https://www.usnews.com/cmsmedia/e3/2f/9c2bcdf94ae8b3083e555346e2e0/20221011-fallcampusscenics-jb-0303.JPG"
              alt="image1"
              className="container3-image"
            />
          </div>
          <div className="item3 right-item3">
            <h2>Spacious and Beautiful Campus Locations</h2>
            <h6>
              The University has two campus locations, a site office at Whiteman
              Air Force Base and an online presence
              <br />
              <br />
              Our Midwestern charm and hospitality is something in which we’re
              proud. This is in addition to our nationally recognized and
              beautiful campus grounds.
            </h6>
          </div>
        </div>
        <div className="afterHomeView-containerText">
          <h2>ABOUT US</h2>

          <h5>
            Here, your education extends beyond books to include
            service-learning projects, study abroad opportunities and real-world
            experiences. Plus, Here is the state leader in degree completion
            among public universities. Statistics recently released by the
            Department of Higher Education (MDHE) show that our degree
            completion rate per full-time equivalent (FTE) is the highest among
            all of public universities and more than double the state benchmark.
            <br />
            <br />
            Here we strive to give you the student services, resources and
            support you need to experience academic success and earn your degree
            on time. Take classes online or on our campuses. Take the Virtual
            Self-Guided Tour to view to our campuses before visiting in person.
          </h5>
        </div>
        <iframe
          title="YouTube Video"
          width="600"
          height="300"
          src="https://www.youtube.com/embed/LlCwHnp3kL4?autoplay=1&loop=100&mute=1&controls=0&autohide=1"
          frameBorder="0"
          allow=" encrypted-media; picture-in-picture"
          allowFullScreen
          className="background-video"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
