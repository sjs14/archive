import{d,i as p,a as m,f as s,E as i,g as a,t as c,o as l,_ as u}from"./index-036ccd73.js";const v=["innerHTML"],f=["textContent"],k=["textContent"],y=d({__name:"NoteDisplay",props:{class:{type:String,required:!1},noteHtml:{type:String,required:!1},note:{type:String,required:!1},placeholder:{type:String,required:!1}},emits:["click"],setup(t){const n=t;return p(m),(o,e)=>t.noteHtml?(l(),s("div",{key:0,class:i(["prose overflow-auto outline-none",n.class]),onClick:e[0]||(e[0]=r=>o.$emit("click")),innerHTML:t.noteHtml},null,10,v)):t.note?(l(),s("div",{key:1,class:i(["prose overflow-auto outline-none",n.class]),onClick:e[1]||(e[1]=r=>o.$emit("click"))},[a("p",{textContent:c(t.note)},null,8,f)],2)):(l(),s("div",{key:2,class:i(["prose overflow-auto outline-none opacity-50 italic",n.class]),onClick:e[2]||(e[2]=r=>o.$emit("click"))},[a("p",{textContent:c(n.placeholder||"No notes.")},null,8,k)],2))}}),g=u(y,[["__file","/Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+@slidev+client@0.40.3_vite@4.1.4/node_modules/@slidev/client/internals/NoteDisplay.vue"]]);export{g as N};
