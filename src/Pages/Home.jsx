import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTweet from '../Components/CreateTweet';
import MyContext from '../Components/Mycontext';
import TweetList from '../Components/TweetList';


function Home(props) {

    const { loading, errorMessage } = props

    return (
        <MyContext.Consumer>
            {({ tweetList }) => (
                <div>
                    <CreateTweet

                        loading={loading}
                        errorMessage={errorMessage} />

                    <div className='tweetList'>
                        {tweetList.map((element => <TweetList
                            element={element}
                            key={element.id}
                        />))}
                    </div>
                </div>
            )}
        </MyContext.Consumer>
    )
}
export default Home;