(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const d=document.querySelectorAll(".draggable"),l=document.querySelectorAll(".droppable"),u=document.querySelectorAll(".dropzone"),f=document.querySelector(".end-modal"),y=document.querySelector(".modal-overlay");function m(){d.forEach(e=>{e.addEventListener("dragstart",s=>{s.dataTransfer.setData("text/plain",s.target.id)})}),l.forEach(e=>{e.addEventListener("dragover",s=>{s.preventDefault()})}),l.forEach(e=>{e.addEventListener("drop",s=>{const n=s.dataTransfer.getData("text/plain"),r=document.getElementById(n);s.preventDefault(),e.appendChild(r)}),window.setInterval(function(){e.classList.contains("metal-bin")&&e.hasChildNodes()&&e.firstChild.classList.contains("metal")||e.classList.contains("food-bin")&&e.hasChildNodes()&&e.firstChild.classList.contains("food")?e.classList.add("green"):!e.hasChildNodes()||e.classList.contains("items-grid")?(e.classList.remove("green"),e.classList.remove("red")):e.classList.add("red"),Array.from(u).every(r=>r.classList.contains("green"))&&(f.style.display="flex",y.style.display="flex")},100)})}m();const i=document.querySelector(".instructions-modal"),g=document.querySelector(".onboarding-link"),h=document.querySelector(".modal-close"),a=document.querySelector(".modal-overlay");g.addEventListener("click",()=>{i.style.display="block",a.style.display="block"});h.addEventListener("click",()=>{i.style.display="none",a.style.display="none"});
