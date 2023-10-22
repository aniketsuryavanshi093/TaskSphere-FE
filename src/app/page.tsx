/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import "./home.scss"
import Link from 'next/link'
import Header from './_components/UI/Header/Header'

export default function Home() {
  return (
    <main >
      <div className="hero_area">
        <Header />
        <section className="slider_section ">
          <div id="customCarousel1" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="img-box">
                        <img src="/images/slider-img.png" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="detail-box">
                        <h1>
                          Insights at Your Fingertips
                        </h1>
                        <p>
                          Make data-driven decisions with TaskSphere's insightful analytics, providing you with valuable project metrics.
                        </p>
                        <div className="btn-box">
                          <a href="" className="btn1">
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="img-box">
                        <img src="/images/slider-img2.png" alt="" />

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="detail-box">
                        <h1>
                          Customizable Workflows
                        </h1>
                        <p>
                          Tailor TaskSphere to fit your team's unique needs, making project management a breeze.
                        </p>
                        <div className="btn-box">
                          <a href="" className="btn1">
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="img-box">
                        <img src="/images/slider-img3.png" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="detail-box">
                        <h1>
                          Effortless Task Tracking
                        </h1>
                        <p>
                          Stay on top of every task's progress and status in real-time, ensuring nothing falls through the cracks.
                        </p>
                        <div className="btn-box">
                          <a href="" className="btn1">
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol className="carousel-indicators">
              <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
              <li data-target="#customCarousel1" data-slide-to="1"></li>
              <li data-target="#customCarousel1" data-slide-to="2"></li>
            </ol>
          </div>
        </section>
      </div>
      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>
              Our Services
            </h2>
            <p>
              Efficient solutions for your needs, delivered with care and expertise.
            </p>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s1.png" width={100} height={100} alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Admin Dashboard
                  </h5>
                  <p>
                    Empower Your Projects, Conquer Tasks!
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s2.png" width={100} height={100} alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    User Tasks
                  </h5>
                  <p>
                    Empower Projects, Unleash Productivity, Thrive
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s3.png" width={100} height={100} alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Task tracking
                  </h5>
                  <p>
                    Track Tasks, Achieve More, Simplified.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s4.png" width={100} height={100} alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Easy UX
                  </h5>
                  <p>
                    Effortless Experiences, Delightful User Interactions."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about_section layout_padding">
        <div className="container  ">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>
                    About Us
                  </h2>
                </div>
                <p>
                  TaskSphere is a powerful and intuitive project management tool designed to streamline your team's workflow and boost productivity. Say goodbye to scattered tasks and missed deadlines; TaskSphere empowers you to take control of your projects with ease.
                </p>
                <a href="">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="img-box">
                <img src="/images/about-img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="case_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>
              Our Case Studies
            </h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="box">
                <div className="img-box">
                  <Image width={100} height={100} src="/images/case-1.jpg" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Sit amet consectetur adipisicing elit
                  </h5>
                  <p>
                    Alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                  </p>
                  <a href="" className='cp'>
                    <span>
                      Read More
                    </span>
                    <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box">
                <div className="img-box">
                  <Image width={100} height={100} src="/images/case-2.jpg" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Excepturi placeat nihil eos maxime
                  </h5>
                  <p>
                    Alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                  </p>
                  <a href="">
                    <span>
                      Read More
                    </span>
                    <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client_section ">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Testimonial
            </h2>
          </div>
        </div>
        <div id="customCarousel2" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <Image width={100} height={100} src="/images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="client_info">
                          <div className="client_name">
                            <h5>
                              Morojink
                            </h5>
                            <h6>
                              Customer
                            </h6>
                          </div>
                          <i className="fa fa-quote-left" aria-hidden="true"></i>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore
                          et
                          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum
                          dolore eu fugia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <Image width={100} height={100} src="/images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="client_info">
                          <div className="client_name">
                            <h5>
                              Morojink
                            </h5>
                            <h6>
                              Customer
                            </h6>
                          </div>
                          <i className="fa fa-quote-left" aria-hidden="true"></i>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore
                          et
                          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum
                          dolore eu fugia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <div className="box">
                      <div className="img-box">
                        <Image width={100} height={100} src="/images/client.jpg" alt="" />
                      </div>
                      <div className="detail-box">
                        <div className="client_info">
                          <div className="client_name">
                            <h5>
                              Morojink
                            </h5>
                            <h6>
                              Customer
                            </h6>
                          </div>
                          <i className="fa fa-quote-left" aria-hidden="true"></i>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore
                          et
                          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum
                          dolore eu fugia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ol className="carousel-indicators">
            <li data-target="#customCarousel2" data-slide-to="0" className="active"></li>
            <li data-target="#customCarousel2" data-slide-to="1"></li>
            <li data-target="#customCarousel2" data-slide-to="2"></li>
          </ol>
        </div>
      </section>
      <section className="contact_section layout_padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 offset-md-1">
              <div className="form_container">
                <div className="heading_container">
                  <h2>
                    Request A Call back
                  </h2>
                </div>
                <form action="">
                  <div>
                    <input type="text" placeholder="Full Name " />
                  </div>
                  <div>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone number" />
                  </div>
                  <div>
                    <input type="text" className="message-box" placeholder="Message" />
                  </div>
                  <div className="d-flex ">
                    <button>
                      SEND
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-lg-7 px-0">
              <div className="map_container">
                <div className="map">
                  <div id="googleMap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer_container">
        <section className="info_section ">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3 ">
                <div className="info_detail">
                  <h4>
                    TaskSphere
                  </h4>
                  <p>
                    Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-2 mx-auto">
                <div className="info_link_box">
                  <h4>
                    Links
                  </h4>
                  <div className="info_links">
                    <a className="" href="index.html">
                      Home
                    </a>
                    <a className="" href="about.html">
                      About
                    </a>
                    <a className="" href="service.html">
                      Services
                    </a>
                    <a className="" href="contact.html">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 ">
                <h4>
                  Subscribe
                </h4>
                <form action="#">
                  <input type="text" placeholder="Enter email" />
                  <button type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
              <div className="col-md-6 col-lg-3 mb-0 ml-auto">
                <div className="info_contact">
                  <h4>
                    Address
                  </h4>
                  <div className="contact_link_box">
                    <a href="">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <span>
                        Location
                      </span>
                    </a>
                    <a href="">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <span>
                        Call +01 1234567890
                      </span>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      <span>
                        demo@gmail.com
                      </span>
                    </a>
                  </div>
                </div>
                <div className="info_social">
                  <a href="">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer_section">
          <div className="container">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By
              <a href="https://html.design/">Free Html Templates</a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
