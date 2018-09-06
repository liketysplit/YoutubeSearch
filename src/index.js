import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS library
import "./index.css"; // in addition, import our own CSS specs

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

import YTSearch from "youtube-api-search";

const API_KEY = "AIzaSyD96qHmy3mUR_m8vTmbXSQdhTTavvjfp_A";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		YTSearch({ key: API_KEY, term: "surfboards" }, videos => {
			// ES6 syntax for this.setState({ videos: videos});
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render() {
		return (
			<div className="row">
				<SearchBar />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					// callback function
					onVideoSelect={selectedVideo =>
						this.setState({ selectedVideo })
					}
					videos={this.state.videos}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
