import React, {Component} from 'react';
import {Router, Link} from 'react-router';
import TopicStore from '../stores/topic-store';
import Actions from '../actions';
import Dropdown from './Dropdown';

export default class Header extends Component {
	constructor(props) {
		super(props);
        this.state = {
        	topics: []
        };
    }

	componentWillMount() {
		Actions.getTopics();
	}

	componentDidMount() {
		this.unsubscribe = TopicStore.listen(this.onChange.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onChange(topics) {
		this.setState({
			topics: topics
		});
	}

	setHeaderBrandName(sBrandName) {
		var result = "";

		if (location.pathname.replace(/^\/([^\/]*).*$/, '$1').length) {
			result = <Link className="navbar-brand" to="/">{sBrandName}</Link>
		} else {
			result = <Link className="navbar-brand">{sBrandName}</Link>
		}

		return result;
	}

	render() {
		return (
			<header className="header">
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container-fluid">
						{this.setHeaderBrandName('Imgur Browser')}

					    <div className="collapse navbar-collapse">
					      <ul className="nav navbar-nav navbar-right">
					          <Dropdown items={this.state.topics} title="Topics"/>
					      </ul>
					    </div>
					</div>
				</nav>
			</header>
		);
	}
}