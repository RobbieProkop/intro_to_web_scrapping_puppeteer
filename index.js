const fs = require("fs");

const puppeteer = require("puppeteer");
// async function delay(time) {
//   await ((resolve) => {
//     setTimeout(resolve,time)
//   })
// }
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/creative.hair.styling", {
    waitUntil: "networkidle2",
  });

  // clcik the x to close login modal
  await page.click("._abn5");
  await page.screenshot({ path: "example.png", fullPage: true });
  // await page.pdf({ path: "example.pdf", format: "A4" });

  //Get HTML content
  // const html = await page.content();

  // const title = await page.evaluate(() => document.title);

  // const text = await page.evaluate(() => document.body.innerText);

  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (e) => e.href)
  // );

  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("#courses .card"), (e) => ({
  //     title: e.querySelector(".card-body h3").innerText,
  //     level: e.querySelector(".card-body .level").innerText,
  //     url: e.querySelector(".card-footer a").href,
  //     promo: e.querySelector(".card-footer .promo-code .promo").innerText,
  //   }))
  // );

  // const courses = await page.$$eval("#courses .card", (el) =>
  //   el.map((e) => ({
  //     title: e.querySelector(".card-body h3").innerText,
  //     level: e.querySelector(".card-body .level").innerText,
  //     url: e.querySelector(".card-footer a").href,
  //     promo: e.querySelector(".card-footer .promo-code .promo").innerText,
  //   }))
  // );

  //Pull info from Instagram
  // const images = await page.$$eval(".x1iyjqo2 div div ._ac7v", (el) =>
  // );
  // const link = document.querySelector("._aabd");

  await page.waitForSelector("._aabd");
  const images = await page.evaluate(() =>
    Array.from(
      document.querySelector("._aabd", (e) => ({
        url: `https://www.instagram.com${e.querySelector("a")}`.href,
        url: e.innerText,
      }))
      // document.querySelectorAll(
      //   ".x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz._a6hd"
      // ).href
    )
  );

  console.log("images :>> ", images);
  // Save Data to JSON file
  fs.writeFile("imgURL.json", JSON.stringify(images), (err) => {
    if (err) throw new err();
    console.log("File Saved ");
  });

  await browser.close();
}

run();
