(()=>{"use strict";(()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error"),o=document.querySelector("#success").content.querySelector(".success"),r={CLICK:"click",KEYDOWN:"keydown",MOUSEDOWN:"mousedown",MOUSEMOVE:"mousemove",MOUSEUP:"mouseup",CHANGE:"change",SUBMIT:"submit",LOAD:"load"},n={ESCAPE:"Escape",ENTER:"Enter"};let i;const s=()=>{i.remove()},a=e=>{e.preventDefault(),s(),l()},d=e=>{e.key===n.ESCAPE&&(e.preventDefault(),s(),l())},l=()=>{document.removeEventListener(r.CLICK,a),document.removeEventListener(r.KEYDOWN,d)};window.util={declinationOfNumber:(e,t)=>(e=Math.abs(e)%100)>10&&e<20?t[2]:e%10>1&&e%10<5?t[1]:e%10==1?t[0]:t[2],renderErrorMessage:e=>{const t=document.createElement("div");t.style="position: absolute; left: 0; right: 0; background-color: tomato; padding: 4px; text-align: center;",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},showMessage:n=>{switch(n){case"success":i=o.cloneNode(!0);break;case"error":i=t.cloneNode(!0)}e.appendChild(i),document.addEventListener(r.CLICK,a),document.addEventListener(r.KEYDOWN,d)},Evt:r,Key:n}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o="GET",r="POST",n=(e,{url:t,onLoad:r,onError:n,data:i})=>{const s=new XMLHttpRequest;e===o&&(s.responseType="json"),s.open(e,t),s.timeout=2e3,s.addEventListener(window.util.Evt.LOAD,(()=>{200===s.status?r(s.response):n(`Статус ответа: ${s.status} ${s.statusText}`)})),s.addEventListener("error",(()=>{n("Произошла ошибка соединения")})),s.addEventListener("timeout",(()=>{n(`Запрос не успел выполниться за ${s.timeout} мс`)})),s.send(i)};window.backend={load:(t,r)=>{n(o,{url:e,onLoad:t,onError:r})},save:(e,o,i)=>{n(r,{url:t,onLoad:o,onError:i,data:e})}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=["комната","комнаты","комнат"],t=["гостя","гостей","гостей"],o=document.querySelector("#card").content.querySelector(".map__card"),r=e=>null==e||""===e||0===e.length,n=(e,t)=>{e.querySelector(t).classList.add("hidden")},i=(e,t,o)=>{r(o)?n(e,t):e.querySelector(t).textContent=o},s={bungalow:"Бунгало",flat:"Квартира",house:"Дом",palace:"Дворец"},a=()=>{const e=window.map.getActivePin();if(e){const t=window.map.getActiveCard();window.map.toggleActivePinClass(e),t.remove()}};window.card={openAdCard:d=>{const{target:l}=d,c=l.closest('[type="button"]');if(l&&c){a();const d=(a=>{const d=document.createDocumentFragment(),l=(a=>{let d=o.cloneNode(!0);return i(d,".popup__title",a.offer.title),i(d,".popup__text--address",a.offer.address),i(d,".popup__text--price",a.offer.price+"₽/ночь"),i(d,".popup__type",s[a.offer.type]),((o,i,s,a)=>{if(r(s)||r(a))n(o,i);else{const r=`${s} ${window.util.declinationOfNumber(s,e)}`,n=`${a} ${window.util.declinationOfNumber(a,t)}`;o.querySelector(i).textContent=`${r} для ${n}`}})(d,".popup__text--capacity",a.offer.rooms,a.offer.guests),((e,t,o,i)=>{r(o)||r(i)?n(e,t):e.querySelector(t).textContent=`Заезд после ${o}, выезд до ${i}`})(d,".popup__text--time",a.offer.checkin,a.offer.checkout),((e,t,o)=>{r(o)?n(e,".popup__features"):o.forEach((t=>{e.querySelector(".popup__feature--"+t).classList.remove("hidden")}))})(d,0,a.offer.features),i(d,".popup__description",a.offer.description),((e,t,o)=>{if(r(o))n(e,t);else{const r=e.querySelector(t),n=r.removeChild(r.querySelector(".popup__photo"));o.forEach((e=>{const t=n.cloneNode(!0);t.src=e,r.appendChild(t)}))}})(d,".popup__photos",a.offer.photos),((e,t,o)=>{r(o)?n(e,t):e.querySelector(t).src=o})(d,".popup__avatar",a.author.avatar),d})(window.page.getFilteredAds()[a]);return d.appendChild(l),window.map.setFragmentPlace(d),l})(Number(c.dataset.pinId));window.map.toggleActivePinClass(c),d.querySelector(".popup__close").addEventListener(window.util.Evt.CLICK,a)}},closeAdCard:a}})(),(()=>{const e="map--faded",t=document.querySelector(".map"),o=t.querySelector(".map__pin--main"),r=o.offsetLeft,n=o.offsetTop,i=o.offsetWidth,s=o.offsetHeight,a=0-i/2,d=t.offsetWidth-i/2,l=130-s,c=630-s,u=t.querySelector(".map__pins"),w=document.querySelector("#pin").content.querySelector(".map__pin");let p;const m=e=>{0===e.button&&(e.preventDefault(),p||(window.page.activatePage(),p=!0),(e=>{let t={x:e.clientX,y:e.clientY};const r=e=>{e.preventDefault();const r=t.x-e.clientX,n=t.y-e.clientY;t={x:e.clientX,y:e.clientY};const i=o.offsetLeft-r,s=o.offsetTop-n;o.style.left=Math.max(Math.min(i,d),a)+"px",o.style.top=Math.max(Math.min(s,c),l)+"px",window.form.setCustomAddress()},n=e=>{e.preventDefault(),document.removeEventListener(window.util.Evt.MOUSEMOVE,r),document.removeEventListener(window.util.Evt.MOUSEUP,n)};document.addEventListener(window.util.Evt.MOUSEMOVE,r),document.addEventListener(window.util.Evt.MOUSEUP,n)})(e))},f=e=>{e.key!==window.util.Key.ENTER||p||(e.preventDefault(),window.page.activatePage(),p=!0)};document.addEventListener(window.util.Evt.KEYDOWN,(e=>{e.key===window.util.Key.ESCAPE&&(e.preventDefault(),window.card.closeAdCard())})),u.addEventListener(window.util.Evt.CLICK,window.card.openAdCard),window.map={renderPinsList:e=>{const t=u.querySelectorAll('[type="button"]');if(t)for(let e of t)e.remove();const o=document.createDocumentFragment();e.forEach(((e,t)=>o.appendChild(((e,t)=>{const o=w.cloneNode(!0),r=o.querySelector("img");return o.setAttribute("style",`left: ${e.location.x-25}px; top: ${e.location.y-70}px`),o.dataset.pinId=t,r.src=e.author.avatar,r.alt=e.offer.title,o})(e,t)))),u.appendChild(o)},getPinCoordinates:e=>{const t=e?Math.round(s/2):s;return`${parseInt(o.style.left,10)+Math.round(i/2)}, ${parseInt(o.style.top,10)+t}`},addFadedClass:()=>t.classList.add(e),removeFadedClass:()=>t.classList.remove(e),getActiveCard:()=>t.querySelector(".map__card"),getActivePin:()=>t.querySelector(".map__pin--active"),toggleActivePinClass:e=>e.classList.toggle("map__pin--active"),addListenersForActivatePage:()=>{o.addEventListener(window.util.Evt.MOUSEDOWN,m),o.addEventListener(window.util.Evt.KEYDOWN,f)},removeListenersForActivatePage:()=>{o.removeEventListener(window.util.Evt.MOUSEDOWN,m),o.removeEventListener(window.util.Evt.KEYDOWN,f)},setFragmentPlace:e=>{t.insertBefore(e,t.querySelector(".map__filters-container"))},resetPinPosition:()=>{o.style.left=r+"px",o.style.top=n+"px",p=!1},removePins:()=>{const e=t.querySelectorAll(".map__pin");for(let t=1;t<e.length;t++)e[t].remove()}}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),r=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),i=e.querySelector("#housing-features"),s=(e,t,o)=>"any"===e||o(e,t),a=(e,t)=>{for(let o=0;o<e.length;o++)if(!t.includes(e[o]))return!1;return!0},d=(e,t)=>{switch(e){case"any":return!0;case"low":return t<1e4;case"middle":return t>=1e4&&t<5e4;case"high":return t>=5e4;default:return!1}},l=()=>{const e=[],l=Array.from(i.querySelectorAll(".map__checkbox")).filter((e=>e.checked)).map((e=>e.value));for(const i of window.page.getSavedAds())if(s(t.value,i.offer.type,compareStrings)&&s(r.value,i.offer.rooms,compareStrings)&&s(n.value,i.offer.guests,compareStrings)&&d(o.value,i.offer.price)&&(0===l.length||a(l,i.offer.features))&&(e.push(i),5===e.length))break;window.page.saveFilteredAds(e),window.map.renderPinsList(e)};e.addEventListener(window.util.Evt.CHANGE,window.debounce((()=>{window.card.closeAdCard(),l()}))),window.filter={getFormChildren:()=>e.children,filterAds:l,resetForm:()=>{e.reset()}}})(),(()=>{const e=["jpg","jpeg","png"];window.preview=(t,o)=>{const r=t.files[0],n=r.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){const e=new FileReader,t=document.createElement("img");for(t.style="width: 100%; height: 100%; min-width: 40px; object-fit: contain;";o.firstChild;)o.removeChild(o.firstChild);e.addEventListener(window.util.Evt.LOAD,(()=>{t.src=e.result})),e.readAsDataURL(r),o.append(t)}}})(),(()=>{const e="#room_number",t="#capacity",o="#type",r="#timein",n="#timeout",i="ad-form--disabled",s="disabled",a="min",d="placeholder",l=document.querySelector(".ad-form"),c=l.querySelector(".ad-form__reset"),u=l.querySelector("#address"),w=l.querySelector(e),p=l.querySelector(t),m=l.querySelector(o),f=l.querySelector("#price"),v=l.querySelector(r),g=l.querySelector(n),y=l.querySelector(".ad-form-header__preview img").cloneNode(!0),E=()=>{u.value=window.map.getPinCoordinates()},h=i=>{const{target:s}=i;s&&(s.matches(r)?g.value=v.value:s.matches(n)?v.value=g.value:s.matches(e)||s.matches(t)?C():s.matches(o)&&_())},C=()=>{const e=Number(p.value),t=Number(w.value);100===t&&0!==e?p.setCustomValidity("100 комнат не для гостей"):0===e&&100!==t?p.setCustomValidity("Не для гостей только 100 комнат"):t<e?p.setCustomValidity("Мало комнат для выбранного количества гостей"):p.setCustomValidity("")},S={bungalow:0,flat:1e3,house:5e3,palace:1e4},_=()=>{const e=m.value;f.setAttribute(d,S[e]),f.setAttribute(a,S[e]),f.setAttribute(d,S[e]),f.setAttribute(a,S[e])},L=()=>{window.page.resetPage(),window.util.showMessage("success")},A=()=>{window.util.showMessage("error")};l.addEventListener(window.util.Evt.SUBMIT,(e=>{const t=new FormData(l);e.preventDefault(),window.backend.save(t,L,A)})),c.addEventListener(window.util.Evt.CLICK,(e=>{e.preventDefault(),window.page.resetPage()}));const q=l.querySelector(".ad-form-header__preview"),b=l.querySelector(".ad-form__photo");window.form={addFormValidation:h,enableControls:e=>{for(const t of e)t.removeAttribute(s,"")},disableControls:e=>{for(const t of e)t.setAttribute(s,"")},setDefaultAddress:()=>{u.value=window.map.getPinCoordinates(!0)},setCustomAddress:E,getFormChildren:()=>l.children,addChangeListener:()=>{l.addEventListener(window.util.Evt.CHANGE,(e=>{h(e);const{target:t}=e;t&&(t.matches("#avatar")?window.preview(t,q):t.matches("#images")&&window.preview(t,b))}))},removeDisabledClass:()=>l.classList.remove(i),resetForm:()=>{l.reset(),b.textContent="",q.textContent="",q.append(y),_(),E(),l.classList.add(i)}}})(),(()=>{let e,t;const o=t=>{e=t.filter((e=>e.offer)),r(e),window.filter.filterAds(),window.form.enableControls(window.filter.getFormChildren())},r=e=>{t=e},n=e=>{window.util.renderErrorMessage(e)},i=()=>{window.map.addFadedClass(),window.form.disableControls(window.filter.getFormChildren()),window.form.disableControls(window.form.getFormChildren()),window.form.setDefaultAddress()};window.page={deactivatePage:i,activatePage:()=>{window.backend.load(o,n),window.map.removeFadedClass(),window.form.removeDisabledClass(),window.form.enableControls(window.form.getFormChildren()),window.form.setCustomAddress(),window.form.addChangeListener()},resetPage:()=>{window.card.closeAdCard(),window.map.removePins(),window.map.resetPinPosition(),window.filter.resetForm(),window.form.resetForm(),i()},saveFilteredAds:r,getSavedAds:()=>e,getFilteredAds:()=>t}})(),window.page.deactivatePage(),window.map.addListenersForActivatePage()})();