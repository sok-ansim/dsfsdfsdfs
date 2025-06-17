function runTest(questions, resultImages) {
  const testScreen = document.getElementById("test-screen");
  let current = 0;
  let score = 0;

  // 모바일인지 체크하는 함수
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function showQuestion(index) {
    const q = questions[index];

    // 기본 스타일
    let imageStyle = "max-width: 600px; border-radius: 8px; margin-bottom: 20px;";
    let buttonStyle = "margin: 10px; padding: 20px 40px; font-size: 28px;";

    // 모바일일 경우 스타일 덮어쓰기
    if (isMobile()) {
      imageStyle = "width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;";
      buttonStyle = "margin: 10px; padding: 26px 50px; font-size: 30px;";
    }

    testScreen.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <img src="${q.image}" alt="질문 이미지" style="${imageStyle}"><br>
        <p style="font-size: 25px; font-weight: bold;">${q.text}</p>
        <button onclick="next(true)" style="background-color: #100639; color: white; border: none; border-radius: 8px; cursor: pointer; ${buttonStyle}">예</button>
        <button onclick="next(false)" style="background-color: #100639; color: white; border: none; border-radius: 8px; cursor: pointer; ${buttonStyle}">아니오</button>
      </div>
    `;
  }

  window.next = function(answer) {
    if (answer) score++;
    current++;
    if (current < questions.length) {
      showQuestion(current);
    } else {
      showResult();
    }
  }

  function showResult() {
    let resultIndex = 0;
    if (score >= 4) resultIndex = 2;
    else if (score >= 2) resultIndex = 1;

    testScreen.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <img src="${resultImages[resultIndex]}" alt="결과 이미지" style="max-width: 600px; border-radius: 8px; margin-bottom: 20px;"><br>
        <a href="https://m.booking.naver.com/booking/13/bizes/400700?theme=place&lang=ko" target="_blank">
          <button style="margin: 10px; padding: 12px 28px; background-color: #100639; color: white; border: none; border-radius: 8px; font-size: 18px; cursor: pointer;">속안심내과 예약하기</button>
        </a><br><br>
        <p style="font-size: 25px; font-weight: bold;">다른 건강 자가진단 테스트도 해보세요</p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 10px;">
          <a href="colon.html"><button class="other-test-button">대장암</button></a>
          <a href="digest.html"><button class="other-test-button">소화기</button></a>
          <a href="vessel.html"><button class="other-test-button">혈관점수</button></a>
          <a href="brain.html"><button class="other-test-button">뇌 MRI</button></a>
          <a href="heart.html"><button class="other-test-button">심장</button></a>
        </div>
      </div>
    `;
  }

  showQuestion(current);
}
