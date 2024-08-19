import axios from "axios";
import SharedRouter from "./shared/SharedRouter";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = `FynsjsVGBu%2FXbcnFYMX1u5nFNPUm3ETfZzyKEyV7sQ0yviNzq%2BZS6KSgoueEQ3dAIwpPSNHAFydzVE7BR%2FoWww%3D%3D`;
        
        const count = 1;

        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=${API_KEY}&MobileApp=AppTest&MobileOS=WIN&pageNo=${count}&numOfRows=10&_type=json`);

        console.log('API 응답 상태:', response.data);
        console.log('API 응답 데이터:', response.data.response.body.items.item);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SharedRouter />
      <div>
        {/* 추가적인 UI 요소나 로직 */}
      </div>
    </>
  );
};

export default App;
