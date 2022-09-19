import me from"big.js";import F from"bn.js";import u from"bn.js";import{get as K,set as ee}from"lodash";import Y from"dayjs";import re from"dayjs/plugin/utc";Y.extend(re);var O=class{constructor(e){this.logLevel=e.logLevel!==void 0?e.logLevel:0,this.name=e.name}set level(e){this.logLevel=e}get time(){return Y().utc().format("YYYY/MM/DD HH:mm:ss UTC")}get moduleName(){return this.name}isLogLevel(e){return e<=this.logLevel}error(...e){return this.isLogLevel(0)?(console.error(this.time,this.name,"sdk logger error",...e),this):this}logWithError(...e){let r=e.map(t=>typeof t=="object"?JSON.stringify(t):t).join(", ");throw new Error(r)}warning(...e){return this.isLogLevel(1)?(console.warn(this.time,this.name,"sdk logger warning",...e),this):this}info(...e){return this.isLogLevel(2)?(console.info(this.time,this.name,"sdk logger info",...e),this):this}debug(...e){return this.isLogLevel(3)?(console.debug(this.time,this.name,"sdk logger debug",...e),this):this}},v={},ne={};function l(n){let e=K(v,n);if(!e){let r=K(ne,n);e=new O({name:n,logLevel:r}),ee(v,n,e)}return e}var D=l("Raydium_bignumber");var h=new u(0),I=new u(1),Fe=new u(2),Oe=new u(3),Pe=new u(5),P=new u(10),X=new u(100),Ee=new u(1e3),Ue=new u(1e4),H=9007199254740991;function p(n){if(n instanceof u)return n;if(typeof n=="string"){if(n.match(/^-?[0-9]+$/))return new u(n);D.logWithError(`invalid BigNumberish string: ${n}`)}return typeof n=="number"?(n%1&&D.logWithError(`BigNumberish number underflow: ${n}`),(n>=H||n<=-H)&&D.logWithError(`BigNumberish number overflow: ${n}`),new u(String(n))):typeof n=="bigint"?new u(n.toString()):(D.logWithError(`invalid BigNumberish value: ${n}`),new u(0))}function E(n){return P.pow(p(n))}function U(n){var k;if(n===void 0)return{denominator:"1",numerator:"0"};if(n instanceof u)return{numerator:n.toString(),denominator:"1"};if(n instanceof o)return{denominator:n.denominator.toString(),numerator:n.numerator.toString()};let e=String(n),[,r="",t="",i=""]=(k=e.replace(",","").match(/(-?)(\d*)\.?(\d*)/))!=null?k:[],f="1"+"0".repeat(i.length),b=r+(t==="0"?"":t)+i||"0";return{denominator:f,numerator:b,sign:r,int:t,dec:i}}import te from"toformat";var oe=te,W=oe;import T from"big.js";import se from"decimal.js-light";var L=l("module/fraction"),R=W(T),y=W(se),ue={[0]:y.ROUND_DOWN,[1]:y.ROUND_HALF_UP,[2]:y.ROUND_UP},ae={[0]:T.roundDown,[1]:T.roundHalfUp,[2]:T.roundUp},o=class{constructor(e,r=I){this.numerator=p(e),this.denominator=p(r)}get quotient(){return this.numerator.div(this.denominator)}invert(){return new o(this.denominator,this.numerator)}add(e){let r=e instanceof o?e:new o(p(e));return this.denominator.eq(r.denominator)?new o(this.numerator.add(r.numerator),this.denominator):new o(this.numerator.mul(r.denominator).add(r.numerator.mul(this.denominator)),this.denominator.mul(r.denominator))}sub(e){let r=e instanceof o?e:new o(p(e));return this.denominator.eq(r.denominator)?new o(this.numerator.sub(r.numerator),this.denominator):new o(this.numerator.mul(r.denominator).sub(r.numerator.mul(this.denominator)),this.denominator.mul(r.denominator))}mul(e){let r=e instanceof o?e:new o(p(e));return new o(this.numerator.mul(r.numerator),this.denominator.mul(r.denominator))}div(e){let r=e instanceof o?e:new o(p(e));return new o(this.numerator.mul(r.denominator),this.denominator.mul(r.numerator))}toSignificant(e,r={groupSeparator:""},t=1){Number.isInteger(e)||L.logWithError(`${e} is not an integer.`),e<=0&&L.logWithError(`${e} is not positive.`),y.set({precision:e+1,rounding:ue[t]});let i=new y(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(e);return i.toFormat(i.decimalPlaces(),r)}toFixed(e,r={groupSeparator:""},t=1){return Number.isInteger(e)||L.logWithError(`${e} is not an integer.`),e<0&&L.logWithError(`${e} is negative.`),R.DP=e,R.RM=ae[t]||1,new R(this.numerator.toString()).div(this.denominator.toString()).toFormat(e,r)}isZero(){return this.numerator.isZero()}};var ce=l("Raydium_amount"),z=W(me);function pe(n,e){let r="0",t="0";if(n.includes(".")){let i=n.split(".");i.length===2?([r,t]=i,t=t.padEnd(e,"0")):ce.logWithError(`invalid number string, num: ${n}`)}else r=n;return[r,t.slice(0,e)||t]}var d=class extends o{constructor(r,t,i=!0,f){let b=new F(0),k=P.pow(new F(r.decimals));if(i)b=p(t);else{let S=new F(0),j=new F(0);if(typeof t=="string"||typeof t=="number"||typeof t=="bigint"){let[V,Q]=pe(t.toString(),r.decimals);S=p(V),j=p(Q)}S=S.mul(k),b=S.add(j)}super(b,k);this.logger=l(f||"Amount"),this.token=r}get raw(){return this.numerator}isZero(){return this.raw.isZero()}gt(r){return this.token.equals(r.token)||this.logger.logWithError("gt token not equals"),this.raw.gt(r.raw)}lt(r){return this.token.equals(r.token)||this.logger.logWithError("lt token not equals"),this.raw.lt(r.raw)}add(r){return this.token.equals(r.token)||this.logger.logWithError("add token not equals"),new d(this.token,this.raw.add(r.raw))}subtract(r){return this.token.equals(r.token)||this.logger.logWithError("sub token not equals"),new d(this.token,this.raw.sub(r.raw))}toSignificant(r=this.token.decimals,t,i=0){return super.toSignificant(r,t,i)}toFixed(r=this.token.decimals,t,i=0){return r>this.token.decimals&&this.logger.logWithError("decimals overflow"),super.toFixed(r,t,i)}toExact(r={groupSeparator:""}){return z.DP=this.token.decimals,new z(this.numerator.toString()).div(this.denominator.toString()).toFormat(r)}};import{PublicKey as le}from"@solana/web3.js";var Z={symbol:"SOL",name:"Solana",decimals:9},N={symbol:"WSOL",name:"Wrapped SOL",mint:"So11111111111111111111111111111111111111112",decimals:9,extensions:{coingeckoId:"solana"}},nr={isQuantumSOL:!0,isLp:!1,official:!0,mint:new le(N.mint),decimals:9,symbol:"SOL",id:"sol",name:"solana",icon:"https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png",extensions:{coingeckoId:"solana"}};import{PublicKey as q}from"@solana/web3.js";import{TOKEN_PROGRAM_ID as de}from"@solana/spl-token";import{PublicKey as a,SystemProgram as ge,SYSVAR_RENT_PUBKEY as fe}from"@solana/web3.js";function M({pubkey:n,isSigner:e=!1,isWritable:r=!0}){return{pubkey:n,isWritable:r,isSigner:e}}var ur=[M({pubkey:de,isWritable:!1}),M({pubkey:ge.programId,isWritable:!1}),M({pubkey:fe,isWritable:!1})];function J({publicKey:n,transformSol:e}){if(n instanceof a)return e&&n.equals(B)?$:n;if(e&&n===B.toBase58())return $;if(typeof n=="string")try{return new a(n)}catch{throw new Error("invalid public key")}throw new Error("invalid public key")}var ar=new a("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),mr=new a("Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"),cr=new a("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"),pr=new a("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),lr=new a("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),dr=new a("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),gr=new a("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"),fr=new a("USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX"),br=new a("NRVwhjBQiUPYtfDT5zRBVJajzFQHaBUNtC7SNVvqRFa"),hr=new a("ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo"),Nr=new a("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"),$=new a("So11111111111111111111111111111111111111112"),B=a.default;var A=class{constructor({mint:e,decimals:r,symbol:t="UNKNOWN",name:i="UNKNOWN",skipMint:f=!1}){if(e===B.toBase58()||e instanceof q&&B.equals(e)){this.decimals=N.decimals,this.symbol=N.symbol,this.name=N.name,this.mint=new q(N.mint);return}this.decimals=r,this.symbol=t,this.name=i,this.mint=f?q.default:J({publicKey:e})}equals(e){return this===e?!0:this.mint.equals(e.mint)}},x=A;x.WSOL=new A(N);var _=class{constructor({decimals:e,symbol:r="UNKNOWN",name:t="UNKNOWN"}){this.decimals=e,this.symbol=r,this.name=t}equals(e){return this===e}},C=_;C.SOL=new _(Z);var G=new o(X),w=class extends o{toSignificant(e=5,r,t){return this.mul(G).toSignificant(e,r,t)}toFixed(e=2,r,t){return this.mul(G).toFixed(e,r,t)}};var be=l("Raydium_price"),g=class extends o{constructor(r){let{baseToken:t,quoteToken:i,numerator:f,denominator:b}=r;super(f,b);this.baseToken=t,this.quoteToken=i,this.scalar=new o(E(t.decimals),E(i.decimals))}get raw(){return new o(this.numerator,this.denominator)}get adjusted(){return super.mul(this.scalar)}invert(){return new g({baseToken:this.quoteToken,quoteToken:this.baseToken,denominator:this.numerator,numerator:this.denominator})}mul(r){this.quoteToken!==r.baseToken&&be.logWithError("mul token not equals");let t=super.mul(r);return new g({baseToken:this.baseToken,quoteToken:r.quoteToken,denominator:t.denominator,numerator:t.numerator})}toSignificant(r=this.quoteToken.decimals,t,i){return this.adjusted.toSignificant(r,t,i)}toFixed(r=this.quoteToken.decimals,t,i){return this.adjusted.toFixed(r,t,i)}};function s(n){if(n instanceof w)return new o(n.numerator,n.denominator);if(n instanceof g)return n.adjusted;if(n instanceof d)try{return s(n.toExact())}catch{return new o(h)}if(n instanceof o)return n;let e=String(n),r=U(e);return new o(r.numerator,r.denominator)}function $r(n){var t;if(n instanceof w)return{fr:new o(n.numerator,n.denominator)};if(n instanceof g)return{fr:n.adjusted};if(n instanceof d)return{fr:s(n.toExact()),decimals:n.token.decimals};if(n instanceof o)return{fr:n};let e=String(n),r=U(e);return{fr:new o(r.numerator,r.denominator),decimals:(t=r.dec)==null?void 0:t.length}}function Jr(n,e){if(n==null||e==null)return!1;let r=s(n),t=s(e);return r.sub(t).numerator,r.sub(t).numerator.lt(h)}function he(n,e){if(n==null||e==null)return!1;let r=s(n),t=s(e);return r.sub(t).numerator.gt(h)}function Gr(n,e){if(n==null||e==null)return!1;let r=s(n),t=s(e);return r.sub(t).numerator.lte(h)}function Vr(n,e){if(n==null||e==null)return!1;let r=s(n),t=s(e);return r.sub(t).numerator.gte(h)}function Ne(n,e){if(n==null||e==null)return!1;let r=s(n),t=s(e);return r.sub(t).numerator.eq(h)}function Qr(n,e){if(n==null||e==null)return;let r=s(n),t=s(e);try{return r.div(t)}catch{return r}}function en(n,e){if(n==null||e==null)return;let r=s(n),t=s(e);return r.sub(t)}function rn(n){return n==null?!1:!Ne(n,0)}function nn(n,e){return he(e,n)?e:n}export{s as default,Qr as div,Ne as eq,nn as getMax,he as gt,Vr as gte,rn as isMeaningfulNumber,Jr as lt,Gr as lte,en as sub,$r as toFractionWithDecimals};
//# sourceMappingURL=fractionUtil.mjs.map