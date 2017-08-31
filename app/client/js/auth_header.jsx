import React from 'react';

class AuthHeader extends React.Component {
	constructor (props)
	{
		super(props);
		this.state = {
			"authorized": false,
			"userName": 'Vasya'
		};
	}

	render ()
	{
		if (this.state.authorized)
		{
			return (
				<ul>
					<li>Authorized as {this.state.userName} <a href="#" title="">(Log Out)</a></li>
				</ul>
			)
		}
		else
		{
			return (
				<ul>
					<li><a href="#" title="">Sign In</a></li>
					<li><a href="#" title="">Sign Up</a></li>
				</ul>
			)
		}
	}
}

module.exports = AuthHeader;