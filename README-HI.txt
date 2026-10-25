MyVideo — Android मोबाइल से डिप्लॉय करने के लिए तैयार शुरुआती प्रोजेक्ट
====================================================================

क्या तैयार है?
- मोबाइल-अनुकूल वीडियो सर्च पेज
- YouTube Data API v3 सेट होने पर सार्वजनिक वीडियो के शीर्षक, चैनल, थंबनेल और तारीख
- YouTube के एम्बेड प्लेयर में वीडियो चलाना
- API key न होने पर डेमो मोड और YouTube सर्च लिंक
- PWA manifest और service worker
- /health हेल्थ-चेक URL
- Render Blueprint कॉन्फ़िगरेशन (render.yaml)
- Git में अपलोड न होने वाली चीज़ों के लिए .gitignore

Android मोबाइल से GitHub पर अपलोड:
1. ZIP को डाउनलोड करके Android के Files ऐप से Extract करें।
2. GitHub पर नया Public repository बनाएं, नाम: myvideo
3. Repository में Add file > Upload files चुनें।
4. Extract किए गए फोल्डर के अंदर की फाइलें/फोल्डर अपलोड करें। ध्यान दें: server.js, package.json और render.yaml repository के मुख्य स्तर पर हों; पूरा ZIP अपलोड न करें।
5. Commit changes दबाएं। .env या API key कभी अपलोड न करें।

Render पर डिप्लॉय:
1. Render वेबसाइट पर GitHub से साइन इन/कनेक्ट करें और myvideo repository चुनें।
2. यदि Blueprint विकल्प उपलब्ध हो, New > Blueprint चुनकर repository चुनें; render.yaml सेवा को सेट करने के लिए है। अन्यथा New Web Service चुनें।
3. Build command: npm install
   Start command: npm start
4. ऐप बिना API key के भी डेमो मोड में खुलेगा। लाइव YouTube परिणाम के लिए Environment में YOUTUBE_API_KEY नाम का secret जोड़ें।
5. Deploy पूरा होने पर Render द्वारा दिया गया URL खोलें और सर्च टेस्ट करें।

YouTube API key बनाने के लिए:
1. https://console.cloud.google.com/ खोलें और Google Cloud प्रोजेक्ट बनाएं/चुनें।
2. APIs & Services > Library में YouTube Data API v3 को Enable करें।
3. APIs & Services > Credentials में API key बनाएं।
4. API key को Render के Environment में YOUTUBE_API_KEY के मान के रूप में रखें। इसे चैट, सार्वजनिक GitHub repository या index.html में न डालें। संभव हो तो key को YouTube Data API v3 तक सीमित करें और quota की निगरानी करें।

ध्यान दें:
- Render की free-plan उपलब्धता और सीमाएँ बदल सकती हैं; हमेशा-हमेशा बिना रुकावट चलने की गारंटी नहीं है।
- API key/सेटअप के बिना ऐप सीधे API परिणाम नहीं दिखाएगा।
- यह YouTube का आधिकारिक ऐप नहीं है और Google/YouTube से संबद्ध नहीं है।
- यह शुरुआती प्रोटोटाइप है; इसमें यूज़र अकाउंट, खुद के वीडियो अपलोड, लाइक/कमेंट डेटाबेस या एडमिन मॉडरेशन नहीं हैं।
- वीडियो YouTube के आधिकारिक एम्बेड प्लेयर से चलते हैं। YouTube की शर्तों और API नीतियों का पालन करें।
