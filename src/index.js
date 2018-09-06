import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS library
import "./index.css"; // in addition, import our own CSS specs
import _ from "lodash";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

import YTSearch from "youtube-api-search";

const API_KEY = "AIzaSyD96qHmy3mUR_m8vTmbXSQdhTTavvjfp_A";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.videoSearch("world of warcraft");

		this.state = {
			videos: [],
			selectedVideo: null
		};
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, videos => {
			// ES6 syntax for this.setState({ videos: videos});
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce(term => {
			this.videoSearch(term);
		}, 500);

		return (
			<div>
				<SearchBar onSearchTermSearch={videoSearch} />
				<div className="row">
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList
						// callback function
						onVideoSelect={selectedVideo =>
							this.setState({ selectedVideo })
						}
						videos={this.state.videos}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
