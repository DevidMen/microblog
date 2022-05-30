import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTweet from '../Components/CreateTweet';
import TweetList from '../Components/TweetList';
import {useReducer,useRef,useState,useEffect} from 'react'




function Home(props) {

    const {currentUser,tweetList} = props

const allData = [...tweetList]
const perPage = 10;
const types = {
  start: "START",
  loaded: "LOADED"
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        more: action.newData.length === perPage,
        after: state.after + action.newData.length
      };
    default:
      throw new Error("Don't understand action");
  }
};
const [state, dispatch] = useReducer(reducer, {
  loading: false,
  more: true,
  data: [],
  after: 0
});
const { loading, data, after, more } = state;

const load = () => {
  dispatch({ type: types.start });

  setTimeout(() => {
    const newData = allData.slice(after, after + perPage);
    dispatch({ type: types.loaded, newData });
  }, 300);}


  const loader = useRef(load);
  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 0 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
                    <div className='tweetList'>
                  <CreateTweet/>
                        {data.map((element => <TweetList
                        
                            element={element}
                            key={element.id}
                           
                          currentUser = {currentUser.find((el) => { return el.key === element.key})}
                        />))}
                       
                    {loading && <li>Loading...</li>}

{!loading && more && (
  <li ref={setElement} style={{ background: "transparent" }}></li>
)}

                </div>



    )
}
export default Home;



  


