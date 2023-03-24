import React from 'react'
import Layout from '../components/Layout/Layout';

const About=() =>{
  return (
    <Layout>
    <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <div>
        <h2>About Us!</h2>
  <p classname="text-justify mt-2">
  </p><p><span style={{ fontWeight:"bold" }} id="W_Name2">W-Ecommerce</span> is a Professional <span id="W_Type1">Ecommerce</span> Platform. Here we will provide you only interesting content, which you will like very much. We're dedicated to providing you the best of <span id="W_Type2">Ecommerce</span>, with a focus on dependability and <span id="W_Spec">online shopping store </span>. We're working to turn our passion for <span id="W_Type3">Ecommerce</span> into a booming online website. We hope you enjoy our <span id="W_Type4">Ecommerce</span> as much as we enjoy offering them to you.</p>
  <p>I will keep posting more important posts on my Website for all of you. Please give your support and love.</p>
  <p style={{fontWeight: 'bold', textAlign: 'center'}}>Thanks For Visiting Our Site<br /><br />
  </p>
</div>

        </div>
      </div>

    </Layout>
  )
}

export default About
