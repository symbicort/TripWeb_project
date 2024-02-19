import travalImg from '../assets/travalImg.png';
import blogImg from '../assets/blogImg.png';
import communityImg from '../assets/communityImg.png';

export const Main_function = [
  {
    image: travalImg,
    title: '여행정보',
    description:
      '전 세계 800개 도시, 30만개의 관광명소, 음식점, 쇼핑 정보를 확인하세요.',
  },
  {
    image: blogImg,
    title: '여행일정',
    description:
      '전 세계 100, 000개 이상의 여행일절을 확인하고 나만의 일정을 계획해 보세요.',
  },
  {
    image: communityImg,
    title: '커뮤니티',
    description:
      '여행자들과 정보를 공유하고, 궁금한 것은 언제든 물어보세요',
  },
];


export const National_list = {
  components: {
    imgae : travalImg,
    title: 'Components',
    description:
      'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: 'JSX',
    description:
      'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).',
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  props: {
    title: 'Props',
    description:
      'Components accept arbitrary inputs called props. They are like function arguments.',
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: 'State',
    description:
      'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}`,
  },
};