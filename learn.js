(function () {
  const NOTE_IDS = [
    "founding", "kings", "offices", "local", "edu", "foreign",
    "sahwa", "seowon", "bungdang-form", "culture",
    "imjin-before", "imjin-war", "divide", "gwanghae",
    "horan-war", "bukbeol",
    "tax", "bungdang-late", "yeongjo", "jeongjo", "sedo",
    "samjeong", "ideas", "silhak"
  ];

  const CHAPTERS = [
    ["all", "전체"],
    ["rule", "통치 체제와 대외 관계"],
    ["sarim", "사림, 문화, 사회"],
    ["imjin", "임진왜란"],
    ["horan", "호란"],
    ["politics", "조선 후기 정치"],
    ["society", "사회의 변동"]
  ];

  const STUDY = {
    memory: [
      { chapter: "rule", note: "kings", prompt: "태종이 6조를 왕에게 직접 보고하게 한 제도는?", keys: ["직계제"], show: "6조 직계제 (의정부는 거치지 않음)" },
      { chapter: "rule", note: "kings", prompt: "세종 때 정책이 의정부를 거쳐 왕에게 올라간 제도는?", keys: ["서사제"], show: "의정부 서사제" },
      { chapter: "rule", note: "offices", prompt: "홍문관이 왕에게 한 역할 두 가지는?", keys: ["조언", "고문"], show: "조언, 고문" },
      { chapter: "rule", note: "local", prompt: "8도를 관리하려고 파견한 관원은?", keys: ["관찰사"], show: "관찰사. 수령을 관리하고 감독한다." },
      { chapter: "rule", note: "edu", prompt: "성균관에 들어가려면 거쳐야 하는 과거 1차의 이름은?", keys: ["소과"], show: "과거 1차 = 소과" },
      { chapter: "rule", note: "foreign", prompt: "교린의 대상 둘은?", keys: ["여진", "일본"], show: "여진, 일본. 평화 때는 교역, 그렇지 않을 때는 강경 대응." },
      { chapter: "sarim", note: "bungdang-form", prompt: "선조 때 이이가 중심인 붕당은?", keys: ["서인"], show: "서인 (이이). 동인은 이황." },
      { chapter: "sarim", note: "bungdang-form", prompt: "선조 때 이황이 중심인 붕당은?", keys: ["동인"], show: "동인 (이황)" },
      { chapter: "sarim", note: "sahwa", prompt: "기묘사화에서 개혁을 밀어붙인 사람은?", keys: ["조광조"], show: "조광조. 왕도 정치, 현량과, 위훈 삭제." },
      { chapter: "sarim", note: "sahwa", prompt: "무오사화의 계기가 된 김종직의 글은?", keys: ["조의제문"], show: "조의제문" },
      { chapter: "sarim", note: "seowon", prompt: "서원이 맡은 일 두 가지는?", keys: ["제사", "교육"], show: "선대 유학자 제사, 지방 양반 자제 교육" },
      { chapter: "sarim", note: "bungdang-form", prompt: "붕당이 갈라진 계기가 된 인사 자리는?", keys: ["이조전랑"], show: "이조전랑. 인사 담당, 후임 천거." },
      { chapter: "imjin", note: "imjin-war", prompt: "학익진으로 이긴 해전은?", keys: ["한산도"], show: "한산도 대첩" },
      { chapter: "imjin", note: "imjin-war", prompt: "정유재란의 해전을 앞선 것부터 적으면?", keys: ["명량", "노량"], show: "명량대첩, 노량해전" },
      { chapter: "imjin", note: "imjin-war", prompt: "행주산성에서 승리한 장군은?", keys: ["권율"], show: "권율" },
      { chapter: "imjin", note: "gwanghae", prompt: "광해군 때 허준이 편찬한 의서는?", keys: ["동의보감"], show: "동의보감" },
      { chapter: "imjin", note: "imjin-before", prompt: "전쟁 전 조선의 군사력은 어떤 상태였나?", keys: ["약화"], show: "평화 → 군사력 약화. 조총은 왜의 무기." },
      { chapter: "horan", note: "horan-war", prompt: "정묘호란 뒤 후금과 맺은 관계는?", keys: ["형제"], show: "형제 관계" },
      { chapter: "horan", note: "horan-war", prompt: "병자호란 때 인조가 항복한 곳은?", keys: ["삼전도"], show: "삼전도 항복 → 강화조약" },
      { chapter: "horan", note: "horan-war", prompt: "척화파(주전파)는 청과 무엇을 하자고 했나?", keys: ["싸움"], show: "후금의 요구를 거절하고 청과 싸움" },
      { chapter: "horan", note: "bukbeol", prompt: "효종 때 북벌을 주장한 사람 가운데 노트에 적힌 이름은?", keys: ["송시열"], show: "송시열. 북벌은 효종이 죽으며 실패." },
      { chapter: "horan", note: "bukbeol", prompt: "북벌이 실패한 뒤 등장한 주장은?", keys: ["북학"], show: "북학. 청과의 교류, 문물 수용." },
      { chapter: "politics", note: "bungdang-late", prompt: "1차 예송의 승자는?", keys: ["서인"], show: "서인 승리. 서인 1년, 남인 3년." },
      { chapter: "politics", note: "bungdang-late", prompt: "2차 예송의 승자는?", keys: ["남인"], show: "남인 승리. 서인 9개월, 남인 1년." },
      { chapter: "politics", note: "bungdang-late", prompt: "숙종 환국에서 주도 세력의 순서는?", keys: ["서인", "남인", "서인"], show: "서인 → 남인 → 서인. 그 뒤 서인이 노론과 소론으로 갈라짐." },
      { chapter: "politics", note: "bungdang-late", prompt: "경종 때 정국을 주도한 붕당은?", keys: ["소론"], show: "소론. 영조 때는 노론." },
      { chapter: "politics", note: "bungdang-late", prompt: "영조 때 정국을 주도한 붕당은?", keys: ["노론"], show: "노론" },
      { chapter: "politics", note: "tax", prompt: "대동법에서 특산물 대신 내게 한 것 가운데 곡물은?", keys: ["쌀"], show: "쌀, 동전, 배" },
      { chapter: "politics", note: "tax", prompt: "군역법 이후 군포는 몇 필인가?", keys: ["1필"], show: "2필에서 1필" },
      { chapter: "politics", note: "tax", prompt: "비변사는 임시 기구에서 무엇이 되었나?", keys: ["상설"], show: "상설 기구" },
      { chapter: "society", note: "samjeong", prompt: "백골징포는 누구에게 군포를 물리나?", any: [["고인"], ["죽은"]], show: "죽은 사람(고인)" },
      { chapter: "society", note: "samjeong", prompt: "인징은 누구에게 군포를 물리나?", keys: ["이웃"], show: "이웃" },
      { chapter: "society", note: "samjeong", prompt: "환곡이 변질되며 나타난 고리 대출의 노트 표기는?", any: [["고리대화"], ["고리대금"]], show: "고리대화. 본래는 곡식을 빌려 주는 제도." },
      { chapter: "society", note: "silhak", prompt: "김정호가 만든 지도는?", keys: ["대동여지도"], show: "대동여지도" },
      { chapter: "society", note: "ideas", prompt: "동학을 창시한 사람은?", keys: ["최제우"], show: "최제우. 인즉천(인내천)." },
      { chapter: "society", note: "ideas", prompt: "천주교가 처음 들어온 이름은?", keys: ["서학"], show: "서학이라는 학문으로 수용" }
    ],
    understand: [
      { chapter: "rule", note: "founding", prompt: "온건파가 제거된 뒤 조선이 세워지기까지, 노트에 적힌 순서를 말해 보세요.", reveal: "온건파 제거 → 조선 건국 → 한양 천도. 과전법과 온건파·급진파의 분열은 그 앞에 있습니다." },
      { chapter: "rule", note: "offices", prompt: "3사를 둔 이유를 노트에서 확인해 보세요.", reveal: "권력 독점을 막고 언론을 맡은 기관입니다. 사헌부는 감찰, 사간원은 간언과 비판, 홍문관은 조언과 고문입니다." },
      { chapter: "sarim", note: "sahwa", prompt: "사림이 집권한 뒤 정치는 어디로 이어집니까?", reveal: "온건파 → 건국 반대 → 사림 → 사화 → 사림의 집권 → 붕당 정치." },
      { chapter: "sarim", note: "bungdang-form", prompt: "붕당이 처음 생겼을 때 서로를 어떻게 대했습니까?", reveal: "정치적·학문적 차이는 있었지만 서로를 존중했습니다. 갈라진 계기는 이조전랑의 임명입니다." },
      { chapter: "imjin", note: "gwanghae", prompt: "광해군의 중립을 서인이 비판한 까닭을 노트에서 찾아 보세요.", reveal: "명에 군대를 보낸 뒤 강홍립에게 상황에 따라 대처하게 하여 후금과 부딪치지 않았습니다. 명분과 의리를 중시한 서인이 이를 비판했습니다." },
      { chapter: "imjin", note: "divide", prompt: "1592년을 기준으로 전기와 후기에 노트는 무엇을 둡니까?", reveal: "전기는 경국대전, 사화, 붕당. 후기는 호란, 붕당 정치의 변질, 문화 변화." },
      { chapter: "horan", note: "horan-war", prompt: "인조가 친명배금을 편 이유를 노트 문장으로 확인해 보세요.", reveal: "명과의 의리 때문에 후금을 배척했습니다. 그 결과 정묘호란에서는 형제 관계, 병자호란에서는 삼전도 항복과 강화가 이어집니다." },
      { chapter: "horan", note: "bukbeol", prompt: "북벌이 실패한 뒤 나타난 학문 태도는 무엇입니까?", reveal: "북학이 등장해 청과 교류하고 문물을 받아들이자고 했습니다. 노트는 이것이 뒷날 실학과 개화에 영향을 주었다고 적습니다." },
      { chapter: "politics", note: "bungdang-late", prompt: "환국 뒤 서인은 어떻게 갈라집니까?", reveal: "서인 → 남인 → 서인으로 주도 세력이 바뀐 뒤, 서인이 노론과 소론으로 갈라집니다." },
      { chapter: "politics", note: "yeongjo", prompt: "영조의 탕평에서 이조전랑과 서원은 어떻게 되었습니까?", reveal: "이조전랑의 권한을 줄이고 서원을 정리했습니다. 탕평비와 속대전도 이때입니다." },
      { chapter: "society", note: "samjeong", prompt: "삼정이정청은 어떤 결과를 냈습니까?", reveal: "홍경래의 난과 임술 농민 봉기 뒤 삼정의 문란을 고치려고 두었으나 실패했습니다." },
      { chapter: "society", note: "silhak", prompt: "중농학파와 중상학파가 각각 무엇을 주장했습니까?", reveal: "중농은 토지 제도를 고쳐 농촌을 안정시키자고 했습니다. 중상은 상공업을 키우고 청의 문물을 받아들이자고 했습니다." }
    ]
  };

  const EXAMS = [
    {
      id: 1,
      title: "제1회",
      range: "건국과 통치, 대외 관계",
      questions: [
        {
          points: 4, note: "founding",
          stem: "위화도 회군 뒤 조선이 건국되기 전에 있었던 일을 <보기>에서 모두 고른 것은?",
          box: [
            "ㄱ. 과전법으로 권문세족의 대농장을 혁파하고 토지를 다시 나누었다.",
            "ㄴ. 수도를 한양으로 옮겼다.",
            "ㄷ. 신진 사대부가 온건파와 급진파로 나뉘었다.",
            "ㄹ. 성종이 경국대전으로 통치 제도를 마련하였다."
          ],
          choices: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄴ, ㄹ", "ㄷ, ㄹ"],
          key: "ㄱ, ㄷ",
          explain: "과전법과 신진 사대부의 분열은 건국 전 과정입니다. 한양 천도는 건국 다음이고, 경국대전은 성종 때입니다."
        },
        {
          points: 3, note: "kings",
          stem: "왕과 업적을 옳게 연결한 것은?",
          choices: [
            "태종 - 훈민정음",
            "세종 - 홍문관 설치",
            "세조 - 경국대전",
            "성종 - 경국대전으로 중앙과 지방의 통치 제도를 마련하였다.",
            "세종 - 사병 폐지"
          ],
          key: "성종 - 경국대전으로 중앙과 지방의 통치 제도를 마련하였다.",
          explain: "경국대전과 홍문관은 성종입니다. 훈민정음은 세종, 사병 폐지는 태종, 집헌전 폐지는 세조입니다."
        },
        {
          points: 4, note: "offices",
          stem: "3사에 대한 설명으로 옳은 것은?",
          choices: [
            "왕명을 전달하였다.",
            "재판과 사법을 담당하였다.",
            "정책을 논의하였다.",
            "수도의 경비를 맡았다.",
            "언론 기관으로 권력 독점을 방지하였다."
          ],
          key: "언론 기관으로 권력 독점을 방지하였다.",
          explain: "왕명 전달은 승정원, 재판은 의금부, 정책은 의정부, 수도 경비는 한성부입니다. 3사는 언론으로 권력 독점을 막습니다."
        },
        {
          points: 3, note: "offices",
          stem: "임금에게 조언하고 고문하는 기구는?",
          choices: ["승정원", "사간원", "홍문관", "사헌부", "춘추관"],
          key: "홍문관",
          explain: "홍문관은 조언과 고문, 사간원은 간언과 비판, 사헌부는 감찰, 춘추관은 역사책 편찬입니다."
        },
        {
          points: 4, note: "local",
          stem: "지방 행정에 대한 설명으로 옳은 것은?",
          choices: [
            "전국을 10도로 나누었다.",
            "각도에 관찰사를 보내 수령을 관리하고 감독하였다.",
            "수령은 행정만 담당하였다.",
            "향리가 향리를 감찰하였다.",
            "유향소가 수도의 경비를 맡았다."
          ],
          key: "각도에 관찰사를 보내 수령을 관리하고 감독하였다.",
          explain: "전국은 8도이고 관찰사가 수령을 감독합니다. 수령은 행정·사법·군사를 맡습니다. 향리 감찰은 유향소의 일이고, 수도 경비는 한성부입니다."
        },
        {
          points: 3, note: "edu",
          stem: "교육과 과거에 대한 설명으로 옳은 것은?",
          choices: [
            "성균관에 들어가는 관문은 과거 1차인 소과이다.",
            "4북학당은 지방에 두었다.",
            "향교는 한양에 두었다.",
            "서당은 고등 과정이다.",
            "잡과는 양반 자제가 응시한다."
          ],
          key: "성균관에 들어가는 관문은 과거 1차인 소과이다.",
          explain: "서당은 초등, 한양의 중등은 4북학당, 지방의 중등은 향교, 고등은 성균관입니다. 잡과는 중인이 응시합니다."
        },
        {
          points: 4, note: "foreign",
          stem: "사대와 교린에 대한 설명으로 옳은 것은?",
          choices: [
            "태종 때 여진과 조공 무역을 하였다.",
            "교린의 대상은 여진과 일본이다.",
            "평화 시기에는 강경하게 대응하였다.",
            "명은 교린의 대상이다.",
            "비평화 시기에는 교역을 허락하였다."
          ],
          key: "교린의 대상은 여진과 일본이다.",
          explain: "태종 때 명과는 친선과 조공 무역입니다. 교린은 여진·일본이고, 평화 때는 교역, 그렇지 않을 때는 강경 대응입니다."
        },
        {
          points: 5, note: "founding",
          stem: "온건파가 제거된 뒤의 순서로 옳은 것은?",
          choices: [
            "한양 천도 → 조선 건국 → 온건파 제거",
            "온건파 제거 → 한양 천도 → 조선 건국",
            "온건파 제거 → 조선 건국 → 한양 천도",
            "조선 건국 → 온건파 제거 → 한양 천도",
            "급진파 제거 → 조선 건국 → 한양 천도"
          ],
          key: "온건파 제거 → 조선 건국 → 한양 천도",
          explain: "노트는 온건파 제거 다음 조선 건국, 그 다음 한양 천도로 적습니다. 제거된 쪽은 온건파입니다."
        },
        {
          points: 4, note: "kings",
          stem: "국왕과 통치 방식에 대한 설명으로 옳은 것은?",
          choices: [
            "태종은 의정부 서사제를 실시하였다.",
            "세종은 6조 직계제를 실시하였다.",
            "세조는 집헌전을 폐지하고 6조 직계제를 실시하였다.",
            "성종은 사병을 폐지하였다.",
            "세종은 홍문관을 설치하였다."
          ],
          key: "세조는 집헌전을 폐지하고 6조 직계제를 실시하였다.",
          explain: "의정부 서사제와 집헌전·훈민정음은 세종, 6조 직계제와 사병 폐지는 태종, 집헌전 폐지와 6조 직계제는 세조, 홍문관은 성종입니다."
        },
        {
          points: 3, note: "offices",
          stem: "왕명을 전달하는 기구는?",
          choices: ["의금부", "승정원", "한성부", "성균관", "춘추관"],
          key: "승정원",
          explain: "승정원은 왕명 전달, 의금부는 재판과 사법, 한성부는 수도 경비, 성균관은 교육, 춘추관은 역사책입니다."
        }
      ]
    },
    {
      id: 2,
      title: "제2회",
      range: "사림, 사화, 붕당의 형성",
      questions: [
        {
          points: 4, note: "sahwa",
          stem: "온건파 사대부의 후손으로, 향촌에서 성리학을 공부하고 왕권과 신권의 조화를 강조한 세력에 대한 설명으로 옳은 것은?",
          choices: [
            "세조의 집권을 도왔다.",
            "성종 때 3사에 들어가 중앙에 등용되었다.",
            "많은 토지와 노비를 가지고 권력을 독점하였다.",
            "왕실과 혼인하였다.",
            "급진파로서 조선 건국에 참여하였다."
          ],
          key: "성종 때 3사에 들어가 중앙에 등용되었다.",
          explain: "이 설명은 사림입니다. 성종 때 3사에 배치되어 훈구를 비판했습니다. 세조 집권, 토지와 노비, 왕실 혼인은 훈구입니다."
        },
        {
          points: 3, note: "seowon",
          stem: "선대 유학자를 제사하고 지방 양반 자제를 교육하려고 세운 곳은?",
          choices: ["서당", "서원", "유향소", "성균관", "4북학당"],
          key: "서원",
          explain: "서원은 제사와 교육을 맡으며 붕당이 만들어지는 요인이 됩니다. 서당·4북학당·성균관은 교육 단계이고, 유향소는 향촌 자치 기구입니다."
        },
        {
          points: 4, note: "sahwa",
          stem: "무오사화와 기묘사화 사이에 있었던 일을 <보기>에서 모두 고른 것은?",
          box: [
            "ㄱ. 갑자사화가 일어났고, 폐비 윤씨 사건이 계기였다.",
            "ㄴ. 을사사화가 일어났다.",
            "ㄷ. 중종 반정으로 연산군이 폐위되었다.",
            "ㄹ. 서인이 노론과 소론으로 나뉘었다."
          ],
          choices: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄴ, ㄹ", "ㄷ, ㄹ"],
          key: "ㄱ, ㄷ",
          explain: "사화 순서는 무오, 갑자, 중종 반정, 기묘, 을사입니다. 을사사화는 명종 때이고, 노론·소론은 숙종 때 서인의 분열입니다."
        },
        {
          points: 5, note: "sahwa",
          stem: "기묘사화에서 조광조가 밀어붙인 개혁의 내용으로 옳은 것은?",
          choices: [
            "현량과를 실시하여 인재를 찾으려 하였다.",
            "사병을 폐지하였다.",
            "소비를 권하였다.",
            "요동을 정벌하자고 하였다.",
            "청과 화해하자고 하였다."
          ],
          key: "현량과를 실시하여 인재를 찾으려 하였다.",
          explain: "조광조의 개혁은 왕도 정치, 현량과, 위훈 삭제입니다. 사병 폐지는 태종, 소비 권장은 박제가, 요동 정벌은 최영, 청과의 화해는 주화파입니다."
        },
        {
          points: 4, note: "seowon",
          stem: "향약에 대한 설명으로 옳은 것은?",
          choices: [
            "사림이 동인과 서인으로 갈라진 계기이다.",
            "지방민을 교화하고 통제하여 향촌 사회를 이끌었다.",
            "중앙의 과거 제도이다.",
            "포수·살수·사수를 둔 군사 제도이다.",
            "곡식을 빌려 주는 제도이다."
          ],
          key: "지방민을 교화하고 통제하여 향촌 사회를 이끌었다.",
          explain: "향약은 향촌 자치 규약으로, 교화와 통제를 거쳐 향촌을 이끌었습니다. 붕당의 계기는 이조전랑이고, 포수·살수·사수는 훈련도감, 곡식 대출은 환곡입니다."
        },
        {
          points: 5, note: "bungdang-form",
          stem: "㉠ 이조전랑  ㉡ 동인  ㉢ 서인에 대한 설명으로 옳은 것은?",
          choices: [
            "㉠은 역사책을 편찬하는 자리이다.",
            "㉡은 이이가 중심이다.",
            "㉡은 이황의 계통이다.",
            "㉢이 남인과 북인으로 나뉘었다.",
            "㉢은 광해군 때 정국을 주도하였다."
          ],
          key: "㉡은 이황의 계통이다.",
          explain: "이조전랑은 인사와 후임 천거입니다. 동인은 이황, 서인은 이이입니다. 남인·북인으로 갈라진 것은 동인이고, 광해군 때 주도한 쪽은 북인입니다."
        },
        {
          points: 4, note: "bungdang-form",
          stem: "선조 때 사림에서 먼저 갈라진 두 붕당은?",
          choices: ["노론, 소론", "남인, 북인", "서인, 동인", "훈구, 사림", "척화파, 주화파"],
          key: "서인, 동인",
          explain: "사림은 서인(이이)과 동인(이황)으로 나뉩니다. 남인·북인은 그 뒤 동인에서, 노론·소론은 숙종 때 서인에서 갈라집니다."
        },
        {
          points: 3, note: "culture",
          stem: "신분과 역할을 옳게 연결한 것은?",
          choices: [
            "양반 - 기술관과 향리",
            "중인 - 기술관, 향리",
            "상민 - 국역 면제",
            "천인 - 과거를 통한 관직",
            "양반 - 국역 의무"
          ],
          key: "중인 - 기술관, 향리",
          explain: "양반은 과거와 국역 면제, 중인은 기술관·향리, 상민은 농민과 국역 의무, 천인은 노비입니다."
        },
        {
          points: 4, note: "bungdang-form",
          stem: "붕당이 형성되던 시기의 성격으로 옳은 것은?",
          choices: [
            "처음부터 상대 붕당의 존재를 부정하였다.",
            "정치와 학문의 차이는 있었지만 서로를 존중하였다.",
            "형성 계기는 서원을 없앤 일이다.",
            "동인은 이이가 이끌었다.",
            "서원은 붕당과 관계가 없다."
          ],
          key: "정치와 학문의 차이는 있었지만 서로를 존중하였다.",
          explain: "초기 붕당은 정치적·학문적 차이 속에서도 서로를 존중했습니다. 계기는 이조전랑이고, 서원은 형성 요인입니다. 상대를 부정한 것은 숙종 후반입니다."
        },
        {
          points: 5, note: "sahwa",
          stem: "사화가 일어난 순서로 옳은 것은?",
          choices: [
            "갑자 → 무오 → 기묘 → 을사",
            "무오 → 갑자 → 기묘 → 을사",
            "무오 → 기묘 → 갑자 → 을사",
            "을사 → 기묘 → 갑자 → 무오",
            "기묘 → 무오 → 갑자 → 을사"
          ],
          key: "무오 → 갑자 → 기묘 → 을사",
          explain: "무오(연산, 조의제문), 갑자(연산, 폐비 윤씨), 기묘(중종, 조광조), 을사(명종, 외척) 순서입니다. 갑자와 기묘 사이에 중종 반정이 있습니다."
        }
      ]
    },
    {
      id: 3,
      title: "제3회",
      range: "임진왜란과 광해군",
      questions: [
        {
          points: 4, note: "imjin-war",
          stem: "임진왜란의 전개에 대한 설명으로 옳은 것을 <보기>에서 모두 고른 것은?",
          box: [
            "ㄱ. 조선과 명의 연합군이 평양성을 탈환하였다.",
            "ㄴ. 권율이 행주산성에서 패배하였다.",
            "ㄷ. 수군의 활약으로 전라도 평야 지대를 방어하였다.",
            "ㄹ. 의병은 익숙한 지리를 살려 싸웠다."
          ],
          choices: ["ㄱ, ㄴ, ㄷ", "ㄱ, ㄷ, ㄹ", "ㄱ, ㄴ, ㄹ", "ㄴ, ㄷ, ㄹ", "ㄴ, ㄷ"],
          key: "ㄱ, ㄷ, ㄹ",
          explain: "평양 탈환과 행주산성의 권율 승리, 전라도 방어, 의병의 지리 활용이 노트에 있습니다. 행주산성은 패배가 아닙니다."
        },
        {
          points: 4, note: "imjin-war",
          stem: "정유재란에서 이순신의 해전을 시간 순으로 바르게 나열한 것은?",
          choices: [
            "노량해전 → 명량대첩",
            "명량대첩 → 노량해전",
            "한산도 대첩 → 노량해전",
            "옥포 해전 → 명량대첩",
            "사천 해전 → 한산도 대첩"
          ],
          key: "명량대첩 → 노량해전",
          explain: "정유재란의 순서는 명량대첩, 노량해전, 그리고 일본군 격퇴입니다. 옥포·사천·한산도는 임진왜란 때의 승리입니다."
        },
        {
          points: 3, note: "imjin-war",
          stem: "학익진을 써서 승리한 전투는?",
          choices: ["옥포 해전", "사천 해전", "명량대첩", "한산도 대첩", "노량해전"],
          key: "한산도 대첩",
          explain: "한산도 대첩에서 학익진을 썼습니다. 명량과 노량은 정유재란의 해전입니다."
        },
        {
          points: 4, note: "imjin-war",
          stem: "임진왜란의 결과에 대한 설명으로 옳지 않은 것은?",
          choices: [
            "일본에서는 도쿠가와 이예야스로 정권이 바뀌어 에도 막부가 열렸다.",
            "명은 쇠퇴하고 여진이 성장하여 후금이 건국되었다.",
            "일본에서는 도자기와 성리학이 발달하는 계기가 되었다.",
            "조선은 국가 재정 위기와 문화재 피해를 입었다.",
            "조선은 전쟁 전부터 조총을 갖추어 군사력이 강하였다."
          ],
          key: "조선은 전쟁 전부터 조총을 갖추어 군사력이 강하였다.",
          explain: "조선은 평화 속에서 군사력이 약해져 있었습니다. 조총은 왜가 갖춘 무기입니다. 나머지 네 문장은 노트의 결과와 같습니다."
        },
        {
          points: 5, note: "gwanghae",
          stem: "명이 지원군을 요청했을 때, 광해군의 대외 정책으로 옳은 것은?",
          choices: [
            "명과의 의리를 내세워 후금을 배척해야겠어.",
            "청을 정벌할 성곽과 군대를 준비해야겠어.",
            "후금의 요구를 받아들여 화해해야겠어.",
            "사병을 없애고 군사를 왕에게 모아야겠어.",
            "명에 군대를 보내되, 강홍립에게 상황에 따라 대처하게 하여 후금과 부딪치지 않아야겠어."
          ],
          key: "명에 군대를 보내되, 강홍립에게 상황에 따라 대처하게 하여 후금과 부딪치지 않아야겠어.",
          explain: "광해군은 명을 도우면서도 강홍립에게 상황에 따른 대처를 시켜 후금과 충돌을 피했습니다. 후금 배척은 인조의 친명배금, 청 정벌은 북벌, 요구 수용은 주화파, 사병 폐지는 태종입니다."
        },
        {
          points: 3, note: "gwanghae",
          stem: "광해군의 국내 정책으로 옳은 것은?",
          choices: [
            "규장각을 설치하였다.",
            "허준이 동의보감을 편찬하였다.",
            "균역법을 실시하였다.",
            "삼전도에서 항복하였다.",
            "장용영을 설치하였다."
          ],
          key: "허준이 동의보감을 편찬하였다.",
          explain: "동의보감은 광해군 때 허준이 편찬했습니다. 규장각과 장용영은 정조, 균역법은 영조, 삼전도 항복은 인조입니다."
        },
        {
          points: 4, note: "divide",
          stem: "임진왜란(1592)을 기준으로 한 시기 구분으로 옳은 것은?",
          choices: [
            "호란은 전기의 일이다.",
            "경국대전으로 국가의 기틀을 잡은 것은 전기이다.",
            "사화는 후기의 일이다.",
            "붕당 정치의 변질은 전기이다.",
            "문화 변화는 전기에만 해당한다."
          ],
          key: "경국대전으로 국가의 기틀을 잡은 것은 전기이다.",
          explain: "전기는 경국대전, 사화, 붕당입니다. 후기는 호란, 붕당 정치의 변질, 문화 변화입니다."
        },
        {
          points: 5, note: "imjin-war",
          stem: "수군이 거둔 성과로 옳은 것은?",
          choices: [
            "일본군의 무기 보급을 끊고 전라도 평야를 방어하였다.",
            "한양을 가장 먼저 수복하였다.",
            "조총을 노획하여 육군을 이끌었다.",
            "지방 유생과 승려가 이끈 의병과 같은 조직이다.",
            "명량에서 학익진으로 이겼다."
          ],
          key: "일본군의 무기 보급을 끊고 전라도 평야를 방어하였다.",
          explain: "수군 활약의 의의는 무기 보급 차단과 전라도 평야 방어입니다. 학익진은 한산도이고, 의병은 수군과 다른 조직입니다."
        },
        {
          points: 3, note: "imjin-before",
          stem: "임진왜란 전의 상황에 대한 설명으로 옳은 것은?",
          choices: [
            "조선은 평화 속에서 군사력이 약해져 있었다.",
            "왜는 전국이 갈라진 채 조총이 없었다.",
            "조선이 먼저 쓰시마를 친 것이 이 전쟁의 시작이다.",
            "의병은 조총 부대였다.",
            "선조는 한양에서 농성하였다."
          ],
          key: "조선은 평화 속에서 군사력이 약해져 있었다.",
          explain: "조선은 평화로 군사력이 약했고, 왜는 도요토미가 전국을 통일한 뒤 조총을 갖추고 있었습니다. 선조는 의주로 피난했습니다."
        },
        {
          points: 4, note: "gwanghae",
          stem: "광해군의 전후 복구로 옳은 것은?",
          choices: [
            "토지 대장과 호적을 정리하고 황무지를 개간하였다.",
            "규장각에서 개혁 인재를 길렀다.",
            "삼정이정청을 두었다.",
            "청계천을 정비하였다.",
            "수원 화성을 건설하였다."
          ],
          key: "토지 대장과 호적을 정리하고 황무지를 개간하였다.",
          explain: "광해군은 토지 대장·호적, 황무지 개간, 성곽 수리, 동의보감을 남겼습니다. 규장각과 수원 화성은 정조, 청계천은 영조, 삼정이정청은 삼정 문란 뒤입니다."
        }
      ]
    },
    {
      id: 4,
      title: "제4회",
      range: "호란, 북벌, 붕당의 전개",
      questions: [
        {
          points: 4, note: "horan-war",
          stem: "병자호란의 결과로 옳은 것은?",
          choices: [
            "후금과 형제 관계를 맺었다.",
            "인조가 삼전도에서 항복하고 강화하였다.",
            "광해군이 중립 외교를 이어 갔다.",
            "북벌에 성공하였다.",
            "북학이 북벌의 작전 내용이다."
          ],
          key: "인조가 삼전도에서 항복하고 강화하였다.",
          explain: "형제 관계는 정묘호란입니다. 병자호란은 삼전도 항복과 강화조약입니다. 북벌은 그 뒤 실패하고, 북학은 실패 뒤에 나옵니다."
        },
        {
          points: 3, note: "horan-war",
          stem: "남한산성에서 맞선 두 주장에 대한 설명으로 옳은 것은?",
          choices: [
            "척화파는 청과 화해하자고 하였다.",
            "주화파는 후금의 요구를 거절하였다.",
            "척화파는 주전파로도 불리며 청과 싸우자고 하였다.",
            "주화파는 북벌을 주장하였다.",
            "두 세력 모두 친명배금을 반대하였다."
          ],
          key: "척화파는 주전파로도 불리며 청과 싸우자고 하였다.",
          explain: "척화파(주전파)는 요구를 거절하고 청과 싸우자 했고, 주화파는 요구를 받아들이고 화해하자 했습니다."
        },
        {
          points: 4, note: "bukbeol",
          stem: "북벌이 실패한 뒤에 나타난 변화로 옳은 것은?",
          choices: [
            "청을 정벌하는 데 성공하였다.",
            "북학이 등장하여 청의 문물을 받아들이자고 하였다.",
            "훈련도감이 임시 기구로 끝났다.",
            "사림이 훈구로 바뀌었다.",
            "정묘호란이 바로 뒤이어 일어났다."
          ],
          key: "북학이 등장하여 청의 문물을 받아들이자고 하였다.",
          explain: "북벌은 효종이 죽으며 실패했습니다. 그 결과 북학이 나와 청과 교류하고 문물을 받아들이자고 했습니다."
        },
        {
          points: 4, note: "bungdang-late",
          stem: "예송에 대한 설명으로 옳은 것은?",
          choices: [
            "1차 예송은 서인의 승리이다.",
            "1차 예송에서 남인은 1년을 주장하였다.",
            "2차 예송은 서인의 승리이다.",
            "예송은 선조 때 일어났다.",
            "예송 결과 북인이 집권하였다."
          ],
          key: "1차 예송은 서인의 승리이다.",
          explain: "현종 때 1차는 서인 1년 대 남인 3년으로 서인이 이겼고, 2차는 서인 9개월 대 남인 1년으로 남인이 이겼습니다. 이 시기 집권은 남인입니다."
        },
        {
          points: 5, note: "bungdang-late",
          stem: "환국에 대한 설명으로 옳은 것은?",
          choices: [
            "현종 때 집권 세력이 바뀌는 일이다.",
            "급격한 정치 변동으로 지배층이 교체되는 일이다.",
            "환국 뒤 남인이 노론과 소론으로 나뉘었다.",
            "숙종 전부터 상대 붕당의 존재를 부정하였다.",
            "경종 때는 노론이 주도하였다."
          ],
          key: "급격한 정치 변동으로 지배층이 교체되는 일이다.",
          explain: "환국은 숙종 때의 일입니다. 순서는 서인, 남인, 서인이고 서인이 노론·소론으로 갈라집니다. 숙종 전에는 상대의 존재를 인정했습니다. 경종의 주도 세력은 소론입니다."
        },
        {
          points: 4, note: "bungdang-late",
          stem: "경종과 영조 때 정국을 주도한 붕당으로 옳은 것은?",
          choices: [
            "경종은 노론, 영조는 소론이 주도하였다.",
            "경종은 소론, 영조는 노론이 주도하였다.",
            "둘 다 남인이 주도하였다.",
            "경종은 북인이 주도하였다.",
            "영조는 북인이 주도하였다."
          ],
          key: "경종은 소론, 영조는 노론이 주도하였다.",
          explain: "경종은 소론이 주도하고 노론이 있었습니다. 영조는 노론이 주도하고 소론이 있었습니다."
        },
        {
          points: 5, note: "yeongjo",
          stem: "영조의 탕평으로 옳은 것은?",
          choices: [
            "수원 화성을 건설하였다.",
            "노비의 처지를 개선하였다.",
            "친명배금으로 후금을 배척하였다.",
            "장용영을 설치하였다.",
            "탕평비를 세우고 서원을 정리하였다."
          ],
          key: "탕평비를 세우고 서원을 정리하였다.",
          explain: "영조는 이조전랑의 권한을 줄이고 서원을 정리했으며 탕평비와 속대전을 남겼습니다. 수원 화성, 장용영, 노비 처우 개선은 정조이고 친명배금은 인조입니다."
        },
        {
          points: 3, note: "sedo",
          stem: "세도 정치에 대한 설명으로 옳은 것은?",
          choices: [
            "의정부와 6조의 권한이 강해졌다.",
            "붕당이 서로를 존중하였다.",
            "매관매직 등 부정과 부패가 있었다.",
            "과거가 공정하게 치러졌다.",
            "왕이 장용영으로 왕권을 강화하였다."
          ],
          key: "매관매직 등 부정과 부패가 있었다.",
          explain: "세도 정치는 과거 부정, 탐관오리, 매관매직이 있었고 왕권과 의정부·6조가 약해졌습니다. 장용영은 정조의 왕권 강화입니다."
        },
        {
          points: 4, note: "horan-war",
          stem: "인조 즉위와 외교에 대한 설명으로 옳은 것은?",
          choices: [
            "북인이 광해군을 폐위하고 인조를 세웠다.",
            "인조는 친명배금 정책을 폈다.",
            "인조 때 북인이 정국을 주도하였다.",
            "정묘호란에서 인조가 삼전도에서 항복하였다.",
            "인조는 광해군의 중립 외교를 유지하였다."
          ],
          key: "인조는 친명배금 정책을 폈다.",
          explain: "서인이 광해군을 폐위하고 인조를 세웠습니다. 인조는 명과의 의리 때문에 후금을 배척했습니다. 북인은 이때 배제되고 주도 세력은 서인입니다. 삼전도는 병자호란입니다."
        },
        {
          points: 5, note: "bungdang-late",
          stem: "붕당 정치가 변해 간 단계로 옳은 것은?",
          choices: [
            "숙종 전에는 상대 붕당의 존재를 인정하여 균형을 이루었다.",
            "숙종 전부터 상대 붕당을 인정하지 않았다.",
            "경종 뒤에도 두 붕당이 균형을 이루었다.",
            "숙종 후반에는 상대 붕당의 존재를 인정하였다.",
            "일당 전제화는 숙종 전의 특징이다."
          ],
          key: "숙종 전에는 상대 붕당의 존재를 인정하여 균형을 이루었다.",
          explain: "숙종 전에는 상대의 존재를 인정해 균형을 이루었고, 숙종 후반에는 존재를 부정했으며, 경종 뒤에는 한 붕당이 전제했습니다."
        }
      ]
    },
    {
      id: 5,
      title: "제5회",
      range: "제도 변화, 삼정, 실학",
      questions: [
        {
          points: 5, note: "tax",
          stem: "세금 제도에 대한 설명으로 옳은 것을 <보기>에서 모두 고른 것은?",
          box: [
            "ㄱ. 영정법은 전세의 기준을 토지 크기로 바꾸었다.",
            "ㄴ. 대동법은 특산물 대신 쌀, 동전, 배 등으로 내게 하였다.",
            "ㄷ. 군역법은 군포를 2필에서 1필로 줄였다.",
            "ㄹ. 영정법은 풍흉을 기준으로 전세를 거두었다."
          ],
          choices: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄱ, ㄴ, ㄷ", "ㄴ, ㄹ"],
          key: "ㄱ, ㄴ, ㄷ",
          explain: "영정법은 비옥도와 풍흉에서 토지 크기로 기준을 바꿨습니다. 대동법은 특산물을 쌀·동전·배로, 군역법은 군포를 2필에서 1필로 줄였습니다."
        },
        {
          points: 3, note: "tax",
          stem: "임시 기구에서 상설 기구가 되어 기능이 강화된 곳은?",
          choices: ["의정부", "비변사", "의금부", "훈련도감", "승정원"],
          key: "비변사",
          explain: "비변사가 임시 기구에서 상설 기구가 되었습니다. 훈련도감은 포수·살수·사수를 둔 군사 기구로 새로 설치되었습니다."
        },
        {
          points: 4, note: "jeongjo",
          stem: "정조의 개혁으로 옳은 것은?",
          choices: [
            "규장각에서 개혁 인재를 길렀다.",
            "서원을 대폭 정리하였다.",
            "이조전랑의 권한을 줄였다.",
            "청계천만 정비하고 개혁을 마쳤다.",
            "외척에게 비변사의 관직을 맡겼다."
          ],
          key: "규장각에서 개혁 인재를 길렀다.",
          explain: "규장각, 장용영, 수원 화성, 소론·남인 등용, 서얼 완화와 대전통편, 노비 처우 개선은 정조입니다. 서원 정리, 이조전랑 축소, 청계천은 영조이고 외척의 관직 독점은 세도 정치입니다."
        },
        {
          points: 4, note: "samjeong",
          stem: "군포를 걷는 방식과 대상을 옳게 연결한 것은?",
          choices: [
            "인징 - 죽은 사람에게 물린다.",
            "족징 - 이웃에게 물린다.",
            "백골징포 - 죽은 사람에게 물린다.",
            "황구첨정 - 친척에게 물린다.",
            "환곡 - 어린아이에게 군포를 물린다."
          ],
          key: "백골징포 - 죽은 사람에게 물린다.",
          explain: "인징은 이웃, 족징은 친척, 백골징포는 고인, 황구첨정은 어린아이입니다. 환곡은 곡식을 빌려 주는 제도입니다."
        },
        {
          points: 4, note: "samjeong",
          stem: "환곡에 대한 설명으로 옳은 것은?",
          choices: [
            "처음부터 지방 관청의 재정 수단이었다.",
            "본래는 곡식을 빌려 주는 제도이다.",
            "삼정이정청이 문란을 바로잡는 데 성공하였다.",
            "전정의 문란은 이웃에게 군포를 물리는 것이다.",
            "홍경래의 난은 환곡의 본래 목적이다."
          ],
          key: "본래는 곡식을 빌려 주는 제도이다.",
          explain: "환곡의 본래 의의는 곡식 대출이고, 나중에는 고리대화로 변해 지방 관청의 재정이 되었습니다. 삼정이정청은 실패했습니다."
        },
        {
          points: 5, note: "silhak",
          stem: "실학의 학파와 인물을 옳게 연결한 것은?",
          choices: [
            "박제가는 소비를 권한 중농학파이다.",
            "유형원은 농민을 고르게 나누고 관직은 차등을 두자고 한 중농학파이다.",
            "홍대용은 양반 사회를 풍자하였다.",
            "정약용은 중국 중심의 세계관을 비판하였다.",
            "박지원은 토지를 함께 소유하자고 하였다."
          ],
          key: "유형원은 농민을 고르게 나누고 관직은 차등을 두자고 한 중농학파이다.",
          explain: "중농의 유형원은 균등 분배와 관직 차등, 정약용은 공동 소유와 노동량에 따른 분배입니다. 중상의 박제가는 소비, 박지원은 양반 풍자, 홍대용은 중국 중심 세계관 비판입니다."
        },
        {
          points: 3, note: "silhak",
          stem: "국학의 저자와 저술을 옳게 연결한 것은?",
          choices: [
            "안정복 - 택리지",
            "이중환 - 동사강목",
            "김정호 - 대동여지도",
            "유득공 - 대동여지도",
            "박지원 - 발해고"
          ],
          key: "김정호 - 대동여지도",
          explain: "역사는 안정복의 동사강목, 유득공의 발해고입니다. 지리는 이중환의 택리지, 김정호의 대동여지도입니다."
        },
        {
          points: 4, note: "ideas",
          stem: "새로운 사상에 대한 설명으로 옳은 것은?",
          choices: [
            "동학은 제사 거부를 이유로 탄압받았다.",
            "천주교는 처음에 서학이라는 학문으로 받아들여졌다.",
            "정감록은 동학의 경전이다.",
            "인즉천은 천주교의 주장이다.",
            "미륵 신앙은 중상학파의 주장이다."
          ],
          key: "천주교는 처음에 서학이라는 학문으로 받아들여졌다.",
          explain: "천주교는 서학으로 들어왔고 제사 거부로 탄압받았습니다. 동학은 최제우가 창시했고 인즉천을 말했으며 혹세무민으로 탄압받았습니다. 정감록과 미륵은 예언 사상입니다."
        },
        {
          points: 4, note: "samjeong",
          stem: "삼정의 문란과 그 수습에 대한 설명으로 옳은 것은?",
          choices: [
            "삼정이정청은 문란을 바로잡고 성공하였다.",
            "홍경래의 난과 임술 농민 봉기 뒤 삼정이정청을 두었으나 실패하였다.",
            "삼정의 문란은 정조의 탕평으로 끝났다.",
            "환곡은 농민 봉기의 결과로 처음 만들어졌다.",
            "전정의 문란은 황구첨정이다."
          ],
          key: "홍경래의 난과 임술 농민 봉기 뒤 삼정이정청을 두었으나 실패하였다.",
          explain: "두 봉기 뒤 삼정이정청을 두어 문란을 고치려 했으나 실패했습니다. 황구첨정은 군포를 어린아이에게 물리는 군정의 문란입니다."
        },
        {
          points: 5, note: "silhak",
          stem: "실학이 나타난 배경과 주장으로 옳은 것은?",
          choices: [
            "양란 이후의 변화를 배경으로 성리학을 비판하였다.",
            "중상학파는 토지 제도 개혁을 중심으로 하였다.",
            "중농학파는 소비를 권하였다.",
            "국학은 청의 문물 수용을 주장하였다.",
            "홍대용은 양반 사회를 풍자하였다."
          ],
          key: "양란 이후의 변화를 배경으로 성리학을 비판하였다.",
          explain: "실학은 양란 뒤의 사회·경제 변화 속에서 개혁이 필요하다고 보며 성리학을 비판했습니다. 토지 개혁은 중농, 소비와 청 문물은 중상, 양반 풍자는 박지원입니다."
        }
      ]
    }
  ];

  function withAnswers(exams) {
    if (exams.length !== 5) throw new Error("시험은 5회여야 합니다.");
    exams.forEach((exam) => {
      if (exam.questions.length !== 10) throw new Error(exam.title + " 문항 수");
      exam.questions.forEach((q, i) => {
        if (!q.choices || q.choices.length !== 5) throw new Error(exam.title + " " + (i + 1) + " 선택지");
        const at = q.choices.indexOf(q.key);
        if (at < 0) throw new Error(exam.title + " " + (i + 1) + " 정답 문장이 선택지에 없습니다.");
        q.answer = at;
        if (![3, 4, 5].includes(q.points)) throw new Error(exam.title + " 배점");
        if (NOTE_IDS.indexOf(q.note) < 0) throw new Error("없는 노트 " + q.note);
        if (!q.explain) throw new Error(exam.title + " 해설");
      });
    });
  }

  function compact(text) {
    return String(text || "").replace(/\s+/g, "");
  }

  function keysHit(answer, keys) {
    let rest = compact(answer);
    return keys.every((key) => {
      const token = compact(key);
      const at = rest.indexOf(token);
      if (at < 0) return false;
      rest = rest.slice(at + token.length);
      return true;
    });
  }

  function remembered(item, answer) {
    const sets = item.any || [item.keys];
    return sets.some((keys) => keysHit(answer, keys));
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = copy[i];
      copy[i] = copy[j];
      copy[j] = swap;
    }
    return copy;
  }

  function pointsOf(exam) {
    return exam.questions.reduce((sum, q) => sum + q.points, 0);
  }

  function loadResults() {
    try { return JSON.parse(localStorage.getItem("history-exams") || "{}"); }
    catch (error) { return {}; }
  }

  function saveResult(id, result) {
    const all = loadResults();
    all[id] = result;
    localStorage.setItem("history-exams", JSON.stringify(all));
  }

  withAnswers(EXAMS);

  if (typeof document === "undefined") {
    const total = EXAMS.reduce((sum, exam) => sum + exam.questions.length, 0);
    console.log("checked " + EXAMS.length + " exams, " + total + " questions");
    return;
  }

  NOTE_IDS.forEach((id) => {
    if (!document.getElementById(id)) console.error("노트 앵커 없음: " + id);
  });

  const MARKS = ["①", "②", "③", "④", "⑤"];
  const studyRoot = document.querySelector("#study");
  const examRoot = document.querySelector("#exam");
  let studyMode = "memory";
  let studyChapter = "all";
  let session = null;

  function noteButton(id, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "linkish";
    button.textContent = label || "노트에서 보기";
    button.addEventListener("click", () => {
      if (window.showNotes) window.showNotes(id);
    });
    return button;
  }

  function renderStudyHome() {
    studyRoot.replaceChildren();
    const wrap = document.createElement("div");
    wrap.className = "study-card";
    const title = document.createElement("h2");
    title.textContent = "학습";
    const lead = document.createElement("p");
    lead.textContent = "한 단원씩 확인합니다. 암기는 키워드가 들어 있으면 맞습니다. 이해는 채점하지 않고, 적은 뒤 노트 문장과 직접 비교합니다.";
    const filters = document.createElement("div");
    filters.className = "filters";
    const mode = document.createElement("select");
    [["memory", "암기"], ["understand", "이해"]].forEach((pair) => {
      const option = document.createElement("option");
      option.value = pair[0];
      option.textContent = pair[1];
      if (pair[0] === studyMode) option.selected = true;
      mode.appendChild(option);
    });
    const chapter = document.createElement("select");
    CHAPTERS.forEach((pair) => {
      const option = document.createElement("option");
      option.value = pair[0];
      option.textContent = pair[1];
      if (pair[0] === studyChapter) option.selected = true;
      chapter.appendChild(option);
    });
    filters.append(mode, chapter);
    const start = document.createElement("button");
    start.type = "button";
    start.className = "primary";
    start.textContent = "시작";
    start.addEventListener("click", () => {
      studyMode = mode.value;
      studyChapter = chapter.value;
      const bank = studyMode === "memory" ? STUDY.memory : STUDY.understand;
      const pool = bank.filter((item) => studyChapter === "all" || item.chapter === studyChapter);
      session = { mode: studyMode, items: shuffle(pool).slice(0, Math.min(10, pool.length)), index: 0, misses: [] };
      renderStudyCard();
    });
    wrap.append(title, lead, filters, start);
    studyRoot.appendChild(wrap);
  }

  function renderStudyCard() {
    studyRoot.replaceChildren();
    const wrap = document.createElement("div");
    wrap.className = "study-card";
    if (!session || session.index >= session.items.length) {
      renderStudyDone(wrap);
      studyRoot.appendChild(wrap);
      return;
    }
    const item = session.items[session.index];
    const head = document.createElement("p");
    head.className = "q-head";
    head.textContent = (session.mode === "memory" ? "암기 " : "이해 ") + (session.index + 1) + " / " + session.items.length;
    const prompt = document.createElement("p");
    prompt.textContent = item.prompt;
    wrap.append(head, prompt);
    if (session.mode === "memory") {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("aria-label", "답");
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const check = document.createElement("button");
      check.type = "button";
      check.className = "primary";
      check.textContent = "확인";
      const result = document.createElement("p");
      let graded = false;
      check.addEventListener("click", () => {
        if (graded) return;
        graded = true;
        const ok = remembered(item, input.value);
        result.replaceChildren();
        result.textContent = ok ? "맞습니다. " + item.show : "노트에는 이렇게 있습니다. " + item.show + " ";
        if (!ok) {
          session.misses.push(item);
          result.appendChild(noteButton(item.note));
        }
        const next = document.createElement("button");
        next.type = "button";
        next.textContent = "다음";
        next.addEventListener("click", () => {
          session.index += 1;
          renderStudyCard();
        });
        actions.replaceChildren(next);
      });
      input.addEventListener("keydown", (event) => {
        if (event.isComposing) return;
        if (event.key === "Enter") check.click();
      });
      actions.appendChild(check);
      wrap.append(input, actions, result);
    } else {
      const input = document.createElement("textarea");
      input.rows = 4;
      input.setAttribute("aria-label", "내가 이해한 내용");
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const reveal = document.createElement("button");
      reveal.type = "button";
      reveal.className = "primary";
      reveal.textContent = "노트와 대조";
      const result = document.createElement("p");
      reveal.addEventListener("click", () => {
        result.replaceChildren();
        result.textContent = item.reveal + " ";
        result.appendChild(noteButton(item.note));
        const next = document.createElement("button");
        next.type = "button";
        next.textContent = "다음";
        next.addEventListener("click", () => {
          session.index += 1;
          renderStudyCard();
        });
        actions.replaceChildren(next);
      });
      actions.appendChild(reveal);
      wrap.append(input, actions, result);
    }
    studyRoot.appendChild(wrap);
  }

  function renderStudyDone(wrap) {
    const title = document.createElement("h2");
    title.textContent = "이번 학습";
    const line = document.createElement("p");
    if (session.mode === "memory") {
      const wrong = session.misses.length;
      const total = session.items.length;
      line.textContent = (total - wrong) + " / " + total + " 맞았습니다.";
    } else {
      line.textContent = session.items.length + "문항을 노트와 대조했습니다. 이해 문항은 맞다, 틀리다로 매기지 않습니다.";
    }
    wrap.append(title, line);
    const list = session.mode === "memory" ? session.misses : session.items;
    list.forEach((item) => {
      const row = document.createElement("p");
      row.textContent = item.prompt + " ";
      row.appendChild(noteButton(item.note));
      wrap.appendChild(row);
    });
    const again = document.createElement("button");
    again.type = "button";
    again.className = "primary";
    again.textContent = "처음으로";
    again.addEventListener("click", () => {
      session = null;
      renderStudyHome();
    });
    wrap.appendChild(again);
  }

  function renderExamHome() {
    examRoot.replaceChildren();
    const intro = document.createElement("div");
    intro.className = "exam-home";
    const title = document.createElement("h2");
    title.textContent = "시험";
    const lead = document.createElement("p");
    lead.textContent = "선택형 5지선다입니다. 제출하기 전에는 정답과 해설이 나오지 않습니다. 해설의 노트 보기는 그 문항이 나온 단원으로 이어집니다. 문항과 오답은 노트에 있는 사실만 옮겼습니다.";
    intro.append(title, lead);
    const list = document.createElement("div");
    list.className = "exam-list";
    const saved = loadResults();
    EXAMS.forEach((exam) => {
      const card = document.createElement("article");
      const name = document.createElement("h3");
      name.textContent = exam.title + " · " + exam.range;
      const meta = document.createElement("p");
      meta.textContent = exam.questions.length + "문항 · 만점 " + pointsOf(exam) + "점";
      card.append(name, meta);
      const past = saved[exam.id];
      if (past) {
        const score = document.createElement("p");
        score.textContent = "지난 결과 " + past.score + " / " + past.total;
        card.appendChild(score);
      }
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const start = document.createElement("button");
      start.type = "button";
      start.className = "primary";
      start.textContent = past ? "다시 풀기" : "풀기";
      start.addEventListener("click", () => renderPaper(exam, null));
      actions.appendChild(start);
      if (past) {
        const review = document.createElement("button");
        review.type = "button";
        review.textContent = "해설 보기";
        review.addEventListener("click", () => renderPaper(exam, past));
        actions.appendChild(review);
      }
      card.appendChild(actions);
      list.appendChild(card);
    });
    examRoot.append(intro, list);
  }

  function renderPaper(exam, review) {
    examRoot.replaceChildren();
    const paper = document.createElement("div");
    paper.className = "paper";
    const main = document.createElement("div");
    const head = document.createElement("h2");
    head.textContent = exam.title + " 역사";
    const range = document.createElement("p");
    range.textContent = exam.range + " · 선택형 · 만점 " + pointsOf(exam) + "점. 제출 전에는 채점하지 않습니다.";
    main.append(head, range);
    if (review) {
      const score = document.createElement("p");
      score.textContent = "득점 " + review.score + " / " + review.total;
      main.appendChild(score);
    }
    const picks = review ? review.answers.slice() : exam.questions.map(() => null);

    exam.questions.forEach((q, index) => {
      const block = document.createElement("article");
      block.className = "q";
      const title = document.createElement("p");
      title.className = "q-head";
      title.textContent = (index + 1) + ". " + q.points + "점";
      const stem = document.createElement("p");
      stem.textContent = q.stem;
      block.append(title, stem);
      if (q.box) {
        const box = document.createElement("div");
        box.className = "box";
        const label = document.createElement("p");
        label.textContent = "<보기>";
        const items = document.createElement("ol");
        q.box.forEach((line) => {
          const li = document.createElement("li");
          li.textContent = line;
          items.appendChild(li);
        });
        box.append(label, items);
        block.appendChild(box);
      }
      const choices = document.createElement("ol");
      choices.className = "choices";
      q.choices.forEach((choice, choiceIndex) => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "exam-" + exam.id + "-" + index;
        input.value = String(choiceIndex);
        if (picks[index] === choiceIndex) input.checked = true;
        if (review) input.disabled = true;
        input.addEventListener("change", () => {
          picks[index] = choiceIndex;
          paintSheet();
        });
        const text = document.createElement("span");
        text.textContent = MARKS[choiceIndex] + " " + choice;
        label.append(input, text);
        li.appendChild(label);
        if (review && choiceIndex === q.answer) li.classList.add("mark-right");
        if (review && picks[index] === choiceIndex && choiceIndex !== q.answer) li.classList.add("mark-wrong");
        choices.appendChild(li);
      });
      block.appendChild(choices);
      if (review) {
        const why = document.createElement("p");
        why.className = "explain";
        const yours = picks[index] == null ? "무응답" : MARKS[picks[index]];
        why.textContent = "내 답 " + yours + " · 정답 " + MARKS[q.answer] + ". " + q.explain + " ";
        why.appendChild(noteButton(q.note));
        block.appendChild(why);
      }
      main.appendChild(block);
    });

    const sheet = document.createElement("aside");
    sheet.className = "sheet";
    const sheetTitle = document.createElement("p");
    sheetTitle.textContent = "답안";
    const rows = document.createElement("ol");
    sheet.append(sheetTitle, rows);
    const submit = document.createElement("button");
    submit.type = "button";
    submit.className = "wide";
    submit.textContent = review ? "목록으로" : "제출";
    submit.addEventListener("click", () => {
      if (review) {
        renderExamHome();
        return;
      }
      if (picks.some((pick) => pick == null)) {
        const go = window.confirm("비운 문항은 오답입니다. 제출할까요?");
        if (!go) return;
      }
      let score = 0;
      exam.questions.forEach((q, index) => {
        if (picks[index] === q.answer) score += q.points;
      });
      const result = { score: score, total: pointsOf(exam), answers: picks };
      saveResult(exam.id, result);
      renderPaper(exam, result);
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    sheet.appendChild(submit);
    const back = document.createElement("button");
    back.type = "button";
    back.className = "wide";
    back.textContent = "그만두기";
    back.addEventListener("click", () => renderExamHome());
    if (!review) sheet.appendChild(back);

    function paintSheet() {
      rows.replaceChildren();
      exam.questions.forEach((q, index) => {
        const li = document.createElement("li");
        const num = document.createElement("span");
        num.textContent = String(index + 1);
        const bubbles = document.createElement("div");
        bubbles.className = "bubbles";
        MARKS.forEach((mark, choiceIndex) => {
          const bubble = document.createElement("button");
          bubble.type = "button";
          bubble.textContent = mark;
          bubble.setAttribute("aria-pressed", String(picks[index] === choiceIndex));
          bubble.disabled = !!review;
          bubble.addEventListener("click", () => {
            picks[index] = choiceIndex;
            const radio = main.querySelector('input[name="exam-' + exam.id + "-" + index + '"][value="' + choiceIndex + '"]');
            if (radio) radio.checked = true;
            paintSheet();
          });
          bubbles.appendChild(bubble);
        });
        li.append(num, bubbles);
        rows.appendChild(li);
      });
    }

    paintSheet();
    paper.append(main, sheet);
    examRoot.appendChild(paper);
  }

  renderStudyHome();
  renderExamHome();
})();
