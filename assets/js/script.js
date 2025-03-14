// ====== home page scroll to down free trial =====

window.smoothScroll = function (target) {
  var scrollContainer = target;
  do {
    //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
    //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  scroll = function (c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + ((b - a) / 30) * i;
    setTimeout(function () {
      scroll(c, a, b, i);
    }, 20);
  };
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

// ===== script for apoientment modal =======
$(document).ready(function () {
  $("#appointment");
  setTimeout(function () {
    $("#appointment").modal("show");
  }, 15000);
});

// ======= apk dwonload finction =======

function downloadAPK() {
  const apkUrl = "./assets/apk/innpos_version_1.0.10_new.apk";

  // Create an anchor element
  const a = document.createElement("a");
  a.href = apkUrl;
  a.download = "./assets/apk/innpos_version_1.0.10_new.apk";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
