import React, { Component } from "react";
import API from "../../utils/API";
import {Input, FormBtn} from "../../components/Form";
import { Container } from "../../components/Grid";
import Results from "../../components/Results";
import Save from "../../components/Save";

class Articles extends Component {
  state = {
    results:[],
    saved:[],
    topic: "",
    startyear: "",
    endyear: ""
  };


  loadResultArticles = (query) => {
    console.log(query);
    API.getNewArticles(query)
      .then(res => {
        console.log(res.data.response.docs);
        this.setState({ results: res.data.response.docs, topic: "", startyear: "", endyear: "" });
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    //if search was clicked
    console.log("search clicked");

    if (this.state.topic) {
      //build query from topic, startyear, endyear
      let query = this.state.topic;
      if(this.state.startyear !== "")
        query += "&begin_date=" + this.state.startyear + "0101";
      if (this.state.endyear !== "")
        query += "&end_date=" + this.state.endyear + "0101";

      this.loadResultArticles(query);
    }
  };

  render() {
    return (
      <Container fluid>
        <div className="row">
          <div className="col-md-12">
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="Start Year"
              />
              <Input
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Results
              results={this.state.results}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Save
              saved={this.state.saved}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default Articles;
