(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),i=t(2),l=function(e){var n=e.value,t=e.onChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})))},m=function(e){var n=e.addPerson,t=e.newName,a=e.handleNewNameChange,u=e.newNumber,c=e.handleNewNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("div",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"delete"))},f=function(e){var n=e.personsToShow,t=e.deletePerson;return r.a.createElement("div",null,n.map(function(e){return r.a.createElement(d,{key:e.name,person:e,deletePerson:function(){return t(e.name)}})}))},s=t(3),h=t.n(s),b="/api/persons",v=function(){return h.a.get(b).then(function(e){return e.data})},p=function(e){return h.a.post(b,e).then(function(e){return e.data})},w=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then(function(e){return e.data})},E=function(e){return h.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},g=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(i.a)(c,2),s=d[0],h=d[1],b=Object(a.useState)(""),j=Object(i.a)(b,2),N=j[0],O=j[1],C=Object(a.useState)(""),S=Object(i.a)(C,2),y=S[0],P=S[1],k=Object(a.useState)(""),T=Object(i.a)(k,2),A=T[0],D=T[1],I=Object(a.useState)(""),J=Object(i.a)(I,2),x=J[0],B=J[1];Object(a.useEffect)(function(){v().then(function(e){u(e)})},[]);var L=""===y?t:t.filter(function(e){return e.name.toLowerCase().includes(y)}),U=function(e,n){var a=t.find(function(n){return n.id===e}),r=Object(o.a)({},a,{number:n});if(window.confirm("".concat(r.name," is already added to phonebook, replace the old number with a new one?"))){var c=r.id;w(c,r).then(function(e){D("Updated ".concat(e.name)),B("success"),setTimeout(function(){D(null)},5e3),u(t.map(function(n){return n.id!==c?n:e}))}).catch(function(e){D("Information of '".concat(a.name,"' has already been removed from server")),B("error"),setTimeout(function(){D(null)},5e3),u(t.filter(function(e){return e.id!==a.id}))})}};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:A,type:x}),r.a.createElement(l,{value:y,onChange:function(e){P(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:s,number:N};t.find(function(e){return e.name===s})?U(t.find(function(e){return e.name===s}).id,n.number):p(n).then(function(e){D("Added ".concat(e.name)),B("success"),setTimeout(function(){D(null)},5e3),u(t.concat(e)),h(""),O("")})},newName:s,handleNewNameChange:function(e){h(e.target.value)},newNumber:N,handleNewNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(f,{personsToShow:L,deletePerson:function(e){var n=t.find(function(n){return n.name===e});window.confirm("Delete ".concat(e,"?"))&&E(n.id).then(function(e){u(t.filter(function(e){return e.id!==n.id}))})}}))};t(38);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.232d73c4.chunk.js.map