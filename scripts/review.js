const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

window.addEventListener('DOMContentLoaded', function() {
    var url = window.location.search;
    var params = new URLSearchParams(url);
    
    showSummary(params);
    updateCounter();
});

function showSummary(params) {
    var summaryDiv = document.getElementById('summary-content');
    
    var productId = params.get('product');
    var productName = 'Unknown';
    
    for(var i = 0; i < products.length; i++) {
        if(products[i].id == productId) {
            productName = products[i].name;
        }
    }
    
    var rating = params.get('rating');
    var installDate = params.get('installDate');
    var features = params.getAll('features');
    var review = params.get('review');
    var userName = params.get('userName');
    
    var featuresText = features.join(', ');
    if(featuresText == '') {
        featuresText = 'None selected';
    }
    
    var html = '';
    html += '<div class="summary-item"><span class="summary-label">Product:</span><span class="summary-value">' + productName + '</span></div>';
    html += '<div class="summary-item"><span class="summary-label">Rating:</span><span class="summary-value">' + rating + ' / 5 Stars</span></div>';
    html += '<div class="summary-item"><span class="summary-label">Installation Date:</span><span class="summary-value">' + installDate + '</span></div>';
    html += '<div class="summary-item"><span class="summary-label">Useful Features:</span><span class="summary-value">' + featuresText + '</span></div>';
    html += '<div class="summary-item"><span class="summary-label">Your Name:</span><span class="summary-value">' + userName + '</span></div>';
    html += '<div class="summary-item"><span class="summary-label">Review:</span><span class="summary-value">' + review + '</span></div>';
    
    summaryDiv.innerHTML = html;
}

function updateCounter() {
    var count = localStorage.getItem('reviewCount');
    
    if(count == null) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }
    
    localStorage.setItem('reviewCount', count);
    
    var counterDisplay = document.getElementById('review-counter');
    counterDisplay.innerHTML = count;
}
