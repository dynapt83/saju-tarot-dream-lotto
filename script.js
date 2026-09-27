const tarotDeck = [
  { name: 'The Fool', meaning: '새로운 시작, 자유, 모험심' },
  { name: 'The Magician', meaning: '가능성, 재능, 실행력' },
  { name: 'The High Priestess', meaning: '직감, 비밀, 내면의 지혜' },
  { name: 'The Empress', meaning: '풍요, 돌봄, 창조성' },
  { name: 'The Emperor', meaning: '질서, 안정, 리더십' },
  { name: 'The Hierophant', meaning: '전통, 가르침, 확신' },
  { name: 'The Lovers', meaning: '선택, 연대, 정서적 연결' },
  { name: 'The Chariot', meaning: '의지, 추진력, 결단' },
  { name: 'Strength', meaning: '인내, 이성, 부드러운 힘' },
  { name: 'The Hermit', meaning: '분석, 고요, 성장' },
  { name: 'Wheel of Fortune', meaning: '변화, 기회, 운의 전환' },
  { name: 'Justice', meaning: '공정, 균형, 판단' },
  { name: 'The Hanged Man', meaning: '멈춤, 관찰, 인내' },
  { name: 'Death', meaning: '변화, 정리, 새로운 전환' },
  { name: 'Temperance', meaning: '조화, 절제, 안정' },
  { name: 'The Devil', meaning: '집착, 유혹, 인식의 전환' },
  { name: 'The Tower', meaning: '충격, 깨짐, 갑작스러운 변화' },
  { name: 'The Star', meaning: '희망, 치유, 용기' },
  { name: 'The Moon', meaning: '불안, 감정, 미지' },
  { name: 'The Sun', meaning: '긍정, 명확, 성공' },
  { name: 'Judgement', meaning: '기회, 부름, 재시작' },
  { name: 'The World', meaning: '완성, 통합, 성취' }
];

const dreamKeywords = {
  비행: '하늘을 나는 꿈은 현실을 벗어나고 싶은 욕구를 뜻합니다. 자신이 감당할 수 있는 범위를 넓히는 시기입니다.',
  바다: '바다는 감정과 무의식의 흐름을 의미합니다. 지금 감정이 많다면 마음을 정리할 시간이 필요합니다.',
  학교: '학교는 성장, 학습, 자기 평가의 상징입니다. 새로운 도전이나 자아 성장을 준비하고 있음을 뜻합니다.',
  집: '집은 안정을 뜻하며, 현재 삶의 기반과 평온함을 상징합니다. 정리와 재정비가 중요합니다.',
  비: '비는 정화와 감정의 배출을 상징합니다. 억눌린 감정을 정리할 기회가 올 수 있습니다.',
  지갑: '지갑은 자원, 기회, 자존감과 연결됩니다. 경제적 혹은 가치관의 변화가 있습니다.',
  시험: '시험은 자기검증과 불안의 상징입니다. 자신을 돌아보는 계기가 될 수 있습니다.',
  애인: '운명적 관계와 정서적인 의미를 의미합니다. 스스로의 감정 상태를 되돌아보는 계기가 됩니다.',
  죽음: '죽음은 끝이 아닌 변화를 뜻합니다. 지금의 불편한 흐름이 새 단계로 나아가게 되는 신호일 수 있습니다.',
  돈: '돈은 가치관과 안정감의 상징입니다. 물질을 넘어서 어떤 가치를 중요하게 여기는지를 점검하세요.'
};

const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

const stemElement = {
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토', 기: '토', 경: '금', 신: '금', 임: '수', 계: '수'
};

const branchElement = {
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토', 사: '화', 오: '화', 미: '토', 신: '금', 유: '금', 술: '토', 해: '수'
};

const personalityMap = {
  목: '유연하고 신중하며 꾸준함',
  화: '열정적이고 표현력이 강함',
  토: '안정감과 현실감이 강함',
  금: '분석적이고 결단력이 있음',
  수: '직관적이고 감수성이 풍부함'
};

const fortuneMap = {
  목: '성장과 도전의 시기',
  화: '관계와 표현의 기회',
  토: '안정과 실속의 시기',
  금: '정리와 선택의 시기',
  수: '감정과 직감의 흐름'
};

function safeNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getYearPillar(year) {
  const y = safeNumber(year, 1995);
  const stemIndex = (y - 4) % 10;
  const branchIndex = (y - 4) % 12;
  return {
    stem: stems[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: branches[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

function getMonthPillar(year, month) {
  const y = safeNumber(year, 1995);
  const m = clamp(safeNumber(month, 1), 1, 12);
  const stemIndex = (y + m) % 10;
  const branchIndex = (m + 1) % 12;
  return {
    stem: stems[stemIndex],
    branch: branches[branchIndex]
  };
}

function getDayPillar(year, month, day) {
  const y = safeNumber(year, 1995);
  const m = clamp(safeNumber(month, 1), 1, 12);
  const d = clamp(safeNumber(day, 1), 1, 31);
  const stemIndex = (y + m + d) % 10;
  const branchIndex = (y + m + d) % 12;
  return {
    stem: stems[stemIndex],
    branch: branches[branchIndex]
  };
}

function getHourPillar(dayStem, hourIndex) {
  const hour = Number(hourIndex) ?? 0;
  const branchIndex = hour % 12;
  const branch = branches[branchIndex];
  const stemIndex = (stems.indexOf(dayStem) + branchIndex) % 10;
  return {
    stem: stems[stemIndex],
    branch
  };
}

function summarizeElements(pillars) {
  const allElements = [
    stemElement[pillars.year.stem],
    branchElement[pillars.year.branch],
    stemElement[pillars.month.stem],
    branchElement[pillars.month.branch],
    stemElement[pillars.day.stem],
    branchElement[pillars.day.branch],
    stemElement[pillars.hour.stem],
    branchElement[pillars.hour.branch]
  ];

  const counts = {};
  allElements.forEach((e) => {
    counts[e] = (counts[e] || 0) + 1;
  });

  const [topElement] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ['미상'];
  return topElement;
}

function calculateSaju() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const day = document.getElementById('day').value;
  const hour = document.getElementById('hour').value;

  const yearP = getYearPillar(year);
  const monthP = getMonthPillar(year, month);
  const dayP = getDayPillar(year, month, day);
  const hourP = getHourPillar(dayP.stem, hour);

  const pillars = { year: yearP, month: monthP, day: dayP, hour: hourP };
  const dominant = summarizeElements(pillars);

  document.getElementById('yearPillar').textContent = `${yearP.stem}${yearP.branch}`;
  document.getElementById('monthPillar').textContent = `${monthP.stem}${monthP.branch}`;
  document.getElementById('dayPillar').textContent = `${dayP.stem}${dayP.branch}`;
  document.getElementById('hourPillar').textContent = `${hourP.stem}${hourP.branch}`;
  document.getElementById('sajuElement').textContent = dominant;
  document.getElementById('sajuTrait').textContent = personalityMap[dominant] || '균형형';
  document.getElementById('sajuFortune').textContent = fortuneMap[dominant] || '안정의 시기';
}

function drawTarot() {
  const selected = []; 
  while (selected.length < 3) {
    const idx = Math.floor(Math.random() * tarotDeck.length);
    const card = tarotDeck[idx];
    if (!selected.some((item) => item.name === card.name)) {
      selected.push(card);
    }
  }

  const cards = [
    { target: 'tarotPast', card: selected[0] },
    { target: 'tarotPresent', card: selected[1] },
    { target: 'tarotFuture', card: selected[2] }
  ];

  cards.forEach(({ target, card }) => {
    const element = document.getElementById(target);
    element.querySelector('strong').textContent = card.name.split(' ')[0].slice(0, 2).toUpperCase();
    element.querySelector('small').textContent = card.meaning;
  });

  const reading = `
    - 과거: ${selected[0].name} - ${selected[0].meaning}
    - 현재: ${selected[1].name} - ${selected[1].meaning}
    - 미래: ${selected[2].name} - ${selected[2].meaning}

    오늘의 흐름은 ${selected[1].name}의 에너지가 중심이 됩니다. 
    과거의 경험을 바탕으로 현재의 기회를 점검하고, 미래의 변화는 작은 결단으로 더 나은 방향으로 이어질 수 있습니다.
  `;

  document.getElementById('tarotReading').innerText = reading;
}

function generateDreamReading() {
  const input = document.getElementById('dreamInput').value.trim();

  if (!input) {
    document.getElementById('dreamResult').innerText = '꿈 내용을 입력해 주세요. 예: 비행기, 바다, 집, 시험, 돈, 학교 등.';
    return;
  }

  const sample = Object.entries(dreamKeywords).find(([keyword]) => input.includes(keyword));

  if (sample) {
    const [keyword, meaning] = sample;
    document.getElementById('dreamResult').innerText = `꿈 속의 핵심 요소: ${keyword}\n\n${meaning}\n\n한마디로 정리하면, 현재의 마음속 욕구와 감정이 드러나는 시기입니다. 그대로 밀어붙이기보다 조용히 정리하는 것이 좋습니다.`;
  } else {
    document.getElementById('dreamResult').innerText = `입력하신 꿈은 현재의 감정과 기대가 섞여 있는 상태를 나타냅니다.\n\n이런 꿈은 곧 '어떤 결정을 내려야 하는지'를 알려주는 신호이며, 당신의 내면에서 중요한 문제를 떠올리게 만드는 흐름입니다.\n\n지금은 작은 변화부터 시작해도 좋습니다.`;
  }
}

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const value = Math.floor(Math.random() * 45) + 1;
    numbers.add(value);
  }

  const lottoArray = [...numbers].sort((a, b) => a - b);
  const bonus = Math.floor(Math.random() * 45) + 1;

  const row = document.getElementById('lottoNumbers');
  row.innerHTML = lottoArray.map((n) => `<span class="lotto-ball">${n}</span>`).join('');
  document.getElementById('bonusNumber').textContent = bonus;
}

document.getElementById('sajuBtn').addEventListener('click', calculateSaju);
document.getElementById('drawTarotBtn').addEventListener('click', drawTarot);
document.getElementById('dreamBtn').addEventListener('click', generateDreamReading);
document.getElementById('lottoBtn').addEventListener('click', generateLottoNumbers);

calculateSaju();
drawTarot();
generateLottoNumbers();
