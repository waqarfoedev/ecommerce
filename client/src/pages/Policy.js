import React from 'react'
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/policy2.jpg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
  <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
  <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
<p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
      </div>
    </div>
  </Layout>
  )
}

export default Policy
