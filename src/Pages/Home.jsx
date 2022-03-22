import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTweet from '../Components/CreateTweet';
import TweetList from '../Components/TweetList';


function Home(props){

const {renderTweet, spinner, errorMessage, tweetList} = props

    return(
        <div>

        <CreateTweet 
        renderTweet={renderTweet}
        spinner = {spinner}
        errorMessage = {errorMessage}/>
        
        <div className='tweetList'>
          {tweetList.map((element => <TweetList 
           element = {element}
           key = {element.id}  
           />))}
       </div> 
       </div>
    )
}
export default Home;