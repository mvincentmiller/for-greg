(this["webpackJsonpbulu-gold-standard"]=this["webpackJsonpbulu-gold-standard"]||[]).push([[50],{70:function(e,t,a){"use strict";a.r(t),a.d(t,"ResetPassword",(function(){return p}));var n=a(2),r=a.n(n),s=a(3),o=a(18),c=a(0),u=a.n(c),l=a(17),i=a(26),p=Object(l.a)((function(){var e=Object(c.useContext)(i.a),t=Object(c.useState)(!1),a=Object(o.a)(t,2),n=a[0],l=a[1],p=Object(c.useState)(""),d=Object(o.a)(p,2),m=d[0],w=d[1],b=Object(c.useState)(""),f=Object(o.a)(b,2),g=f[0],h=f[1],v=function(e,t){t||(t=window.location),console.log(e,t),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null},x=function(){var t=Object(s.a)(r.a.mark((function t(a){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),g!==m){t.next=10;break}return n=v("resetUrl"),console.log(n),t.next=6,e.resetPassword(m,n);case 6:t.sent.errors||(window.location.hash="/login"),t.next=12;break;case 10:l(!0),setTimeout((function(){l(!1)}),3e3);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return u.a.createElement("form",{onSubmit:x,style:{maxWidth:"400px",margin:"auto"}},n&&u.a.createElement("p",{className:"has-text-danger",style:{marginBottom:"15px"}},"Passwords are not the same!"),u.a.createElement("div",{className:"field"},u.a.createElement("input",{className:"input",type:"password",id:"password",placeholder:"Enter a New Password",onChange:function(e){return w(e.target.value)}})),u.a.createElement("div",{className:"field"},u.a.createElement("input",{className:"input",type:"password",id:"repassword",placeholder:"Re Enter your Password",onChange:function(e){return h(e.target.value)}})),u.a.createElement("input",{type:"submit",value:"Reset",className:"button is-info"}))}))}}]);
//# sourceMappingURL=50.069112c5.chunk.js.map