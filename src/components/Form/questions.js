const getQuestions = (name) => [
    // 내향(I) / 외향(E)
    {
      question: `업무 회의가 끝난 후, ${name}님은?`,
      options: [
        { key: 'E', value: '동료들과 아이디어를 더 나누며 에너지를 얻는다.' },
        { key: 'I', value: '조용히 내 공간에서 회의 내용을 정리하고 싶다.' },
      ],
      questionNum: 0,
      type: 0
    },
    {
      question: `새로운 팀 프로젝트에 참여하게 되었을 때, ${name}님은?`,
      options: [
        { key: 'E', value: '팀원들과 활발히 소통하며 협력하는 것이 즐겁다.' },
        { key: 'I', value: '혼자 맡은 일을 조용히 처리하는 것이 더 편하다.'},
      ],
      questionNum: 1,
      type: 0
    },
    {
      question: `사무실에서의 에너지 충전 방식은? ${name}님은?`,
      options: [
        { key: 'E', value: '다른 동료들과 대화하거나 네트워킹을 한다.'},
        { key: 'I', value: '조용한 환경에서 집중하거나 혼자만의 시간을 갖는다.'},
      ],
      questionNum: 2,
      type: 0
    },

    // 직관(N) / 감각(S)
    {
        question: `업무를 시작하기 전, 정보가 주어졌을 때 ${name}님은?`,
        options: [
          { key: 'N', value: '전체적인 그림과 장기적인 목표를 먼저 생각한다.' },
          { key: 'S', value: '현재 문제를 해결하기 위한 구체적이고 명확한 데이터를 찾는다.' },
        ],
        questionNum: 0,
        type: 1
      },
      {
        question: `보고서를 작성할 때, ${name}님은?`,
        options: [
          { key: 'N', value: '핵심 메시지와 아이디어를 먼저 정리한 뒤 세부 사항은 나중에 채운다.' },
          { key: 'S', value: '데이터와 사례를 기반으로 구체적인 내용을 채운다.' },
        ],
        questionNum: 1,
        type: 1
      },
      {
        question: `업무에서 새로운 방식이나 아이디어를 접했을 때, ${name}님은?`,
        options: [
          { key: 'N', value: '그 아이디어가 만들어낼 장기적 가능성과 결과를 상상한다.' },
          { key: 'S', value: '실현 가능성과 구체적인 실행 방안을 먼저 고려한다.' },
        ],
        questionNum: 2,
        type: 1
      },
      
    // 사고(T) / 감정(F)
    {
        question: `동료가 실수를 했을 때, ${name}님은?`,
        options: [
          { key: 'T', value: '실수의 원인과 해결 방안을 논리적으로 분석하고 제시한다.' },
          { key: 'F', value: '실수로 인한 동료의 감정을 우선적으로 이해하고 위로한다.' },
        ],
        questionNum: 0,
        type: 2
      },
      {
        question: `프로젝트 목표에 문제가 생겼을 때, ${name}님은?`,
        options: [
          { key: 'T', value: '문제를 분석하고 최적의 해결책을 찾는 데 집중한다.' },
          { key: 'F', value: '문제 해결 과정에서 팀원들의 의견과 감정을 고려한다.' },
        ],
        questionNum: 1,
        type: 2
      },
      {
        question: `피드백을 줄 때, ${name}님은?`,
        options: [
          { key: 'T', value: '개선이 필요한 점을 중심으로 객관적으로 전달한다.' },
          { key: 'F', value: '상대방의 기분을 해치지 않도록 부드럽게 전달한다.' },
        ],
        questionNum: 2,
        type: 2
      },

     // 판단(J) / 인식(P)
     {
       vquestion: `업무 마감일이 정해졌을 때, ${name}님은?`,
        options: [
          { key: 'J', value: '세부적인 계획을 세우고 체계적으로 일정을 진행한다.' },
          { key: 'P', value: '마감일에 맞춰 상황에 따라 유연하게 처리한다.' },
        ],
        questionNum: 0,
        type: 3
      },
      {
        question: `중요한 업무를 맡았을 때, ${name}님은?`,
        options: [
          { key: 'J', value: '사전에 철저히 준비하며 일을 차근차근 진행한다.' },
          { key: 'P', value: '필요에 따라 즉흥적으로 일을 처리하며 유연하게 대처한다.' },
        ],
        questionNum: 1,
        type: 3
      },
      {
        question: `여러 가지 일을 동시에 처리해야 할 때, ${name}님은?`,
        options: [
          { key: 'J', value: '우선순위를 정해 체계적으로 하나씩 해결한다.' },
          { key: 'P', value: '상황에 따라 빠르게 우선순위를 바꾸며 유연하게 대처한다.' },
        ],
        questionNum: 2,
        type: 3
      },
  ];
  export default getQuestions; 