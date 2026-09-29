const CATS=["الكل","إدناءات","نقابات","إسدال","خمار","دريسات","مكملات حجاب","طرح","بديهات كارينا"];
const defaultProducts=[
{id:1,name:"إسدال سجدة الفاخر",cat:"إسدال",price:650,offer:550,details:"خامة مريحة ومناسبة للاستخدام اليومي.",img:"assets/logo.png",colors:["بنفسجي","بيج"]},
{id:2,name:"خمار سجدة",cat:"خمار",price:380,details:"تصميم أنيق وخامة عملية.",img:"assets/logo.png",colors:["موف","أسود"]},
{id:3,name:"طقم دريس شرعي",cat:"دريسات",price:720,offer:620,details:"موديل مناسب للجملة والقطاعي.",img:"assets/logo.png",colors:["بيج","موف"]},
{id:4,name:"نقاب كلاسيك",cat:"نقابات",price:180,details:"خامة خفيفة ومريحة.",img:"assets/logo.png",colors:["أسود"]},
{id:5,name:"طرحة سادة",cat:"طرح",price:120,details:"ألوان متعددة.",img:"assets/logo.png",colors:["موف","بيج","أسود"]},
{id:6,name:"بديهة كارينا",cat:"بديهات كارينا",price:210,details:"خامة عملية.",img:"assets/logo.png",colors:["موف","أسود"]},
];

let products=JSON.parse(localStorage.getItem("sajda_products")||"null")||defaultProducts;
let reviews=JSON.parse(localStorage.getItem("sajda_reviews")||"[]");
let cart=JSON.parse(localStorage.getItem("sajda_cart")||"[]");
let currentCat="الكل";
const WHATSAPP_NUMBER="201200696273";

const $=s=>document.querySelector(s);
$("#year").textContent=new Date().getFullYear();
$("#themeBtn").textContent=document.body.classList.contains("dark")?"☀️ الوضع":"🌙 الوضع";

function renderCats(){ $("#categories").innerHTML=CATS.map(c=>`<button class="${c===currentCat?'active':''}" onclick="setCat('${c}')">${c}</button>`).join("") }
function setCat(c){currentCat=c;renderCats();renderProducts()}
function renderProducts(){
 const q=$("#search").value.trim().toLowerCase();
 const list=products.filter(p=>(currentCat==="الكل"||p.cat===currentCat)&&p.name.toLowerCase().includes(q));
 $("#products").innerHTML=list.map(p=>`
 <article class="product">
   <img src="${p.img}" alt="${p.name}">
   <div class="body">
    <span class="badge">${p.cat}</span><h3>${p.name}</h3>
    <p>${p.details}</p>
    <div>${p.offer?`<span class="old">${p.price} ج</span><span class="price">${p.offer} ج</span>`:`<span class="price">${p.price} ج</span>`}</div>
    ${p.offer?'<small>🔥 عرض</small>':''}
    <br><button class="primary" onclick="openProduct(${p.id})">التفاصيل والطلب</button>
   </div>
 </article>`).join("")||"<p>لا توجد موديلات مطابقة.</p>";
}
function renderReviews(){ $("#reviewsList").innerHTML=reviews.length?reviews.map(r=>`<div class="review"><b>${r.name}</b><div class="reviewStars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div><p>${r.text}</p></div>`).join(""):"<p>كوني أول من يكتب تقييمًا.</p>" }
function save(){localStorage.setItem("sajda_products",JSON.stringify(products));localStorage.setItem("sajda_reviews",JSON.stringify(reviews));localStorage.setItem("sajda_cart",JSON.stringify(cart))}
function openModal(html){$("#modalContent").innerHTML=html;$("#modal").classList.add("show")}
function closeModal(){$("#modal").classList.remove("show")}
document.querySelector(".close").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};

function openProduct(id){
 const p=products.find(x=>x.id===id);
 openModal(`<div class="modalProduct"><img src="${p.img}" id="mainImg"><div class="thumbs">${[p.img,p.img,p.img].map(x=>`<img src="${x}" onclick="document.getElementById('mainImg').src=this.src">`).join("")}</div><h2>${p.name}</h2><p>${p.details}</p><p>الألوان: ${p.colors.join(" • ")}</p><div>${p.offer?`<span class="old">${p.price} ج</span>`:""} <span class="price">${p.offer||p.price} ج</span></div><p><button class="primary" type="button" onclick="addToCart(${p.id})">🛒 أضف للسلة</button></p><hr><h3>بيانات الطلب</h3><form id="orderForm" class="card"><input required name="name" placeholder="الاسم الرباعي"><input required name="phone" placeholder="رقم الموبايل واتساب"><input name="phone2" placeholder="رقم هاتف احتياطي"><textarea required name="address" placeholder="العنوان بالكامل"></textarea><input required type="number" min="1" value="1" name="qty" placeholder="الكمية"><input name="transfer" placeholder="رقم الموبايل المحول منه العربون"><label>صورة التحويل <input type="file" accept="image/*" name="proof"></label><button class="primary">إرسال الطلب عبر واتساب</button></form></div>`);
  $("#orderForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);let message=["طلب جديد من موقع سنتر سجدة",`الموديل: ${p.name}`,`السعر: ${p.offer||p.price} ج`,`الكمية: ${f.get("qty")}`,`الاسم: ${f.get("name")}`,`واتساب: ${f.get("phone")}`,`هاتف احتياطي: ${f.get("phone2")||"-"}`,`العنوان: ${f.get("address")}`,`رقم التحويل: ${f.get("transfer")||"سيتم التوضيح عبر واتساب"}`].join("\n");window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");}
}
$("#reviewForm").onsubmit=e=>{e.preventDefault();reviews.unshift({name:$("#reviewName").value,stars:+$("#reviewStars").value,text:$("#reviewText").value});save();renderReviews();e.target.reset();alert("تم إضافة التقييم");};

$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("sajda_theme",document.body.classList.contains("dark")?"dark":"light");$("#themeBtn").textContent=document.body.classList.contains("dark")?"☀️ الوضع":"🌙 الوضع"};
if(localStorage.getItem("sajda_theme")==="dark"){document.body.classList.add("dark");$("#themeBtn").textContent="☀️ الوضع"}
$("#search").oninput=renderProducts;
function updateCart(){$("#cartCount").textContent=cart.length;save()}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;if(!cart.includes(p.name))cart.push(p.name);updateCart();alert("تمت إضافة المنتج إلى السلة");}
$("#cartBtn").onclick=()=>openModal(`<h2>🛒 سلة الطلبات</h2>${cart.length?`<div class="card">${cart.map((item,index)=>`<p>${item} <button type="button" onclick="removeFromCart(${index})">حذف</button></p>`).join("")}<button class="primary" type="button" onclick="sendCart()">إرسال السلة عبر واتساب</button></div>`:"<p>السلة فارغة.</p>"}`);
function removeFromCart(index){cart.splice(index,1);updateCart();$("#cartBtn").click()}
function sendCart(){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("أرغب في طلب المنتجات التالية من سنتر سجدة:\n- "+cart.join("\n- "))}`,"_blank","noopener")}
$("#chatBtn").onclick=()=>openModal(`<h2>💬 خدمة العملاء</h2><p>اكتب رسالتك:</p><textarea id="chatMsg" class="card" placeholder="رسالتك"></textarea><button class="primary" onclick="sendChat()">إرسال</button>`);
function sendChat(){let msgs=JSON.parse(localStorage.getItem("sajda_chats")||"[]");msgs.push({text:$("#chatMsg").value,date:new Date().toLocaleString("ar-EG")});localStorage.setItem("sajda_chats",JSON.stringify(msgs));alert("تم حفظ الرسالة في نسخة التجربة.");closeModal()}
$("#botBtn").onclick=()=>openModal(`<h2>🤖 سجدة</h2><p>أهلًا بكِ 🌷 أنا مساعد سجدة. اسألي عن الأقسام أو الطلب أو الشحن.</p><input id="botQ" placeholder="اكتبي سؤالك"><button class="primary" onclick="botAnswer()">إرسال</button><div id="botA"></div>`);
function botAnswer(){let q=$("#botQ").value;$("#botA").innerHTML="<p>للمساعدة في الطلبات والتفاصيل، يمكنك التواصل مع خدمة العملاء عبر واتساب.</p>"}
$("#wheelBtn").onclick=()=>openModal(`<h2>🎡 عجلة الحظ</h2><div style="font-size:80px;text-align:center">🎡</div><button class="primary" onclick="alert('🎁 مبروك! جائزة تجريبية — يتم تحديد الجوائز الحقيقية من لوحة الإدارة.')">لف العجلة</button>`);
$("#forumBtn").onclick=()=>openModal(`<h2>💬 منتدى سجدة</h2><p>قسم المنتدى التجريبي جاهز للربط بقاعدة بيانات ومستخدمين.</p>`);
$("#invoiceBtn").onclick=()=>openModal(`<h2>🧾 الفواتير</h2><p>الفواتير مرتبطة بالطلبات بعد إضافة Backend.</p>`);

function admin(){
 openModal(`<div class="admin"><h2>🔐 دخول الإدارة</h2><form id="adminLogin" class="card"><label for="adminPassword">كلمة المرور</label><input id="adminPassword" type="password" required autocomplete="current-password" placeholder="اكتبي كلمة المرور"><button class="primary">دخول</button></form></div>`);
 $("#adminLogin").onsubmit=e=>{e.preventDefault();if($("#adminPassword").value!=="سجدة 99..#"){alert("كلمة المرور غير صحيحة");return}showAdminPanel()};
}
function showAdminPanel(){
 openModal(`<div class="admin"><h2>⚙️ لوحة إدارة سنتر سجدة</h2>
 <div class="adminBox"><h3>إضافة موديل</h3><div class="adminGrid"><input id="pname" placeholder="اسم الموديل"><input id="pcat" placeholder="القسم"><input id="pprice" type="number" placeholder="السعر"><input id="poffer" type="number" placeholder="سعر العرض اختياري"><input id="pimg" placeholder="رابط الصورة"><input id="pcolors" placeholder="الألوان مفصولة بفاصلة"><textarea id="pdetails" placeholder="التفاصيل"></textarea></div><button class="primary" onclick="addProduct()">إضافة</button></div>
 <div class="adminBox"><h3>الإدارة</h3><button onclick="showOrders()">📋 الطلبات</button><button onclick="showChats()">💬 الشات</button><button onclick="showStats()">👥 الزوار والتقييمات</button><button onclick="changePassword()">🔐 تغيير كلمة السر</button><button onclick="offerShipping()">🚚 عروض الشحن</button><button onclick="offerDeposit()">💳 عرض العربون</button></div>
 <div class="adminBox"><h3>الموديلات الحالية</h3>${products.map(p=>`<div style="padding:8px;border-bottom:1px solid #eee">${p.name} — ${p.cat} — ${p.offer||p.price} ج <button onclick="deleteProduct(${p.id})">حذف</button></div>`).join("")}</div>
 </div>`);
}
$("#adminBtn").onclick=admin;

function addProduct(){let p={id:Date.now(),name:$("#pname").value,cat:$("#pcat").value,price:+$("#pprice").value,offer:+$("#poffer").value||null,img:$("#pimg").value||"assets/logo.png",colors:$("#pcolors").value.split(",").map(x=>x.trim()),details:$("#pdetails").value};if(!p.name||!p.cat||!p.price){alert("أكملي البيانات");return}products.push(p);save();renderCats();renderProducts();alert("تمت الإضافة");showAdminPanel()}
function deleteProduct(id){products=products.filter(p=>p.id!==id);save();renderProducts();showAdminPanel()}
function showOrders(){let o=JSON.parse(localStorage.getItem("sajda_orders")||"[]");openModal("<h2>📋 الطلبات</h2>"+(o.length?o.map(x=>`<div class="card"><b>${x.product}</b><br>${x.name}<br>${x.phone}<br>${x.address}<br>الكمية: ${x.qty}<br>العربون: ${x.transfer}<br>${x.date}</div>`).join(""):"لا توجد طلبات"))}
function showChats(){let a=JSON.parse(localStorage.getItem("sajda_chats")||"[]");openModal("<h2>💬 رسائل العملاء</h2>"+(a.length?a.map(x=>`<div class="card">${x.text}<br><small>${x.date}</small></div>`).join(""):"لا توجد رسائل"))}
function showStats(){openModal(`<h2>👥 الإحصائيات</h2><p>التقييمات: ${reviews.length}</p><p>الطلبات: ${JSON.parse(localStorage.getItem("sajda_orders")||"[]").length}</p><p>رسائل الشات: ${JSON.parse(localStorage.getItem("sajda_chats")||"[]").length}</p><p>ملاحظة: عداد الزوار الحقيقي يحتاج Backend/Analytics.</p>`)}
function changePassword(){alert("في النسخة الإنتاجية يتم تغيير كلمة السر من Backend وليس JavaScript حتى لا تكون مكشوفة.");}
function offerShipping(){let x=prompt("اكتب عرض الشحن (مثال: الشحن 20ج)");if(x)alert("تم حفظ العرض في نسخة التجربة: "+x)}
function offerDeposit(){let x=prompt("اكتب قيمة العربون أو اكتب مجاني");if(x)alert("تم ضبط عرض العربون في نسخة التجربة: "+x)}

updateCart();renderCats();renderProducts();renderReviews();
