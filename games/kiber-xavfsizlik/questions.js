const GAME={title:"🛡️ Kiber xavfsizlik",file:"security.log",lang:"sql",badge:"Security",questions:[
 {q:"Qaysi parol eng ishonchli?",o:["T7#kLp9!zQ2m","12345678","parol123","salom"],e:"Uzun, harf, raqam va belgilar aralash parol topilishi eng qiyin."},
 {q:"Phishing (fishing) nima?",o:["Soxta xabar yoki sayt orqali ma'lumotni o'g'irlash","Kompyuterni tozalash","Tarmoq tezligini oshirish","Fayllarni siqish"],e:"Hujumchi o'zini bank yoki tanish odam qilib ko'rsatib, parolingizni so'raydi."},
 {q:"2FA (ikki bosqichli tasdiqlash) nima beradi?",o:["Parol bilinib qolsa ham, kirishni qiyinlashtiradi","Parolni o'chiradi","Internetni tezlashtiradi","Reklamani to'sadi"],e:"Parolga qo'shimcha kod (SMS yoki ilova) so'raladi."},
 {q:"Noma'lum odamdan 'yutuq yutdingiz' degan havola kelsa, nima qilasiz?",o:["Bosmasdan o'chiraman","Darhol bosaman","Do'stlarimga yuboraman","Parolimni kiritaman"],e:"Bunday havolalar ko'pincha firibgarlik yoki virusga olib boradi."},
 {q:"Ransomware (to'lov virusi) nima qiladi?",o:["Fayllarni shifrlab, ochish uchun pul talab qiladi","Ekranni yoritadi","Internetni tezlashtiradi","Parolni yangilaydi"],e:"Himoyalanish uchun fayllarning zaxira nusxasini saqlang."},
 {q:"HTTPS ning HTTP dan asosiy farqi nima?",o:["Ma'lumot shifrlangan holda uzatiladi","Sayt tezroq ochiladi","Reklama chiqmaydi","Hech qanday farqi yo'q"],e:"S — Secure. Manzil satridagi qulf belgisi shuni bildiradi."},
 {q:"Bu so'rov qaysi hujum turiga o'xshaydi?",c:`SELECT * FROM users\nWHERE name = '' OR '1'='1';`,o:["SQL injection","Phishing","DDoS","Ransomware"],e:"'1'='1' sharti doim rost, shuning uchun barcha foydalanuvchilar chiqib qoladi."},
 {q:"Ommaviy Wi-Fi da bank ilovasidan foydalanish nega xavfli?",o:["Trafikni boshqalar kuzatishi mumkin","Telefon tez zaryadsizlanadi","Ilova ishlamay qoladi","Internet sekinlashadi"],e:"Ochiq tarmoqda ma'lumotlaringiz tutib olinishi mumkin."},
 {q:"DDoS hujumi nima?",o:["Serverni juda ko'p so'rov bilan ishdan chiqarish","Parolni taxmin qilish","Faylni shifrlash","Rasmni soxtalashtirish"],e:"Ko'p qurilmadan bir vaqtda so'rov yuborilib, sayt ochilmay qoladi."},
 {q:"Dastur va tizimni muntazam yangilash nega kerak?",o:["Ma'lum zaifliklar yopiladi","Ranglari o'zgaradi","Xotira ko'payadi","Internet bepul bo'ladi"],e:"Yangilanishlar xavfsizlik teshiklarini yopadi."}
]};
