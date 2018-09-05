import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import YTSearch from "youtube-api-search";

const API_KEY = "AIzaSyD96qHmy3mUR_m8vTmbXSQdhTTavvjfp_A";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { videos: [] };

		YTSearch({ key: API_KEY, term: "surfboards" }, videos => {
			// ES6 syntax for this.setState({ videos: videos});
			this.setState({ videos });
		});
	}
	render() {
		return (
			<div>
				<SearchBar />
				<VideoList videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
