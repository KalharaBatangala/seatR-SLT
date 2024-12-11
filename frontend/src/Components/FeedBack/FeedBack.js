import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './FeedBack.css'

function FeedBack() {
  return (
    <div>
      <Header/>
      <div className='feedbackForm'>
        <form>
          <div className='feedbackTopic'>Give Your Feedback Here</div>

          <table>
            <thead>
              <tr >
                <th className='trFeedback'>Field</th>
                <th className='trFeedback'>Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="cus_name">Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                </td>
                <td>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="message">Message:</label>
                </td>
                <td>
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" className='feedbackButton'>
                    Send
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default FeedBack
