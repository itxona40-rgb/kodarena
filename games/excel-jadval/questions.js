const GAME={title:"📊 Microsoft Excel",file:"jadval.xlsx",lang:"xls",badge:"Excel",questions:[
 {q:"Bu formula nimani hisoblaydi?",c:`=SUM(A1:A5)`,o:["A1 dan A5 gacha yig'indini","A1 va A5 ko'paytmasini","A1 dan A5 gacha o'rtachani","Eng katta qiymatni"],e:"SUM — yig'indi, A1:A5 esa kataklar oralig'i."},
 {q:"Bu formula nimani qaytaradi?",c:`=AVERAGE(B1:B4)`,o:["B1 dan B4 gacha o'rtacha qiymatni","Yig'indini","Eng kichik qiymatni","Kataklar sonini"],e:"AVERAGE — o'rtacha arifmetik qiymat."},
 {q:"Bu formula nimani topadi?",c:`=MAX(C1:C10)`,o:["Oraliqdagi eng katta sonni","Eng kichik sonni","O'rtacha sonni","Yig'indini"],e:"MAX eng katta, MIN esa eng kichik qiymatni topadi."},
 {q:"A1 = 70 bo'lsa, natija nima bo'ladi?",c:`=IF(A1>50,"O'tdi","Yiqildi")`,o:["O'tdi","Yiqildi","50","Xato"],e:"70 > 50 sharti rost, shuning uchun birinchi qiymat chiqadi."},
 {q:"Excelda formula har doim qaysi belgi bilan boshlanadi?",o:["= (teng belgisi)","# (panjara)","@ (it belgisi)","$ (dollar)"],e:"= belgisi katakdagi yozuvni formula deb belgilaydi."},
 {q:"Raqam kiritilgan kataklar sonini hisoblaydigan funksiya qaysi?",o:["COUNT","SUM","MAX","IF"],e:"COUNT faqat sonli kataklarni sanaydi."},
 {q:"Bu formulani pastga nusxalaganda A1 o'zgarmasligi uchun nima ishlatiladi?",c:`=A1*B1`,o:["$ belgisi (mutlaq havola)","# belgisi","& belgisi","% belgisi"],e:"$A$1 mutlaq havola: formulani ko'chirsangiz ham A1 qoladi."},
 {q:"A1 = 4 va B1 = 5 bo'lsa, natija nechaga teng?",c:`=A1*B1`,o:["20","9","45","1"],e:"* belgisi ko'paytirish: 4 × 5 = 20."},
 {q:"Ustundagi sonlarni kattadan kichikka tartiblash qaysi bo'limda?",o:["Data → Sort","Insert → Chart","Review → Comment","View → Freeze Panes"],e:"Data bo'limida saralash va filtrlash vositalari joylashgan."},
 {q:"VLOOKUP nima qiladi?",c:`=VLOOKUP(101,A2:C10,2,FALSE)`,o:["Birinchi ustundan 101 ni topib, 2-ustundagi qiymatni qaytaradi","101 raqamini yig'adi","101 raqamini o'chiradi","Jadvalni tartiblaydi"],e:"VLOOKUP jadvaldan kalit bo'yicha mos qiymatni qidirib topadi."}
]};
