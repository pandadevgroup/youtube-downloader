import React from "react";
import injectSheet from 'react-jss'
import {DebounceInput} from 'react-debounce-input';

const styles = {
  searchForm: {
    width: "100%",
    maxWidth: "40rem"
  },
  submit: {
    border: "1px solid #ced4da"
  }
};

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
    this.props.onChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.search);
  }

  render() {
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.searchForm} onSubmit={this.handleSubmit}>
        <div className="input-group">
          <DebounceInput
            minLength={2}
            debounceTimeout={150}
            type="text"
            className="form-control"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Search or paste link here" />
          <div className="input-group-append">
            <button className={`btn btn-outline-primary ${classes.submit}`} type="submit">Go</button>
          </div>
        </div>
      </form>
    );
  }
}

export default injectSheet(styles)(Search);
