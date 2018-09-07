import React from 'react'
import request from 'superagent'

class DuckDuckGo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      relatedTopics: []
    }
    this.fetchDuck = this.fetchDuck.bind(this)
  }

  componentDidMount () {
    // hardcoded for now, but should get this from the user
    const query = 'auckland'
    this.fetchDuck(query)
  }

  getDuck (query) {
    return request
      .get(`https://duckduckgo-duckduckgo-zero-click-info.p.mashape.com/?q=${query}&format=json`)
      .set('X-Mashape-Key', 'NXAmZhbmoEmsh7cGrs65Iuou2kwsp1zkjsGjsnInDHz4mw46IS')
      .then(res => {
        const json = JSON.parse(res.text)
        this.setState({
          relatedTopics: json.RelatedTopics
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  fetchDuck (query) {
    return this.getDuck(query)
      .then(items => {
        this.setState({
          topic: items
        })
      })
  }

  render () {
    return (
      <div className='DuckDuckGo'>
        <h2>DuckDuckGo</h2>
        {
          this.state.relatedTopics.map((topic, i) => {
            return <div key={i}><p>{topic.Text}</p></div>
          })
        }
      </div>
    )
  }
}

export default DuckDuckGo
