// Sends each email order to the Kienyeji Orders app (staff phones get an alert).
// The emails are sent as before; if this fails the order still goes out by email.
// The server recomputes the price and only accepts new, valid orders.
(function () {
    var API = 'https://rafiki-games.onrender.com/kienyeji/api/orders';

    window.kfSaveOrder = function (order) {
        return fetch(API, {
            method: 'POST',
            // text/plain avoids a CORS preflight, which keepalive requests can't always do.
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: JSON.stringify(order),
            // Keeps going even if the customer closes the page right after ordering
            // (the server can take ~30s to wake up).
            keepalive: true
        }).then(function (res) {
            if (!res.ok) throw new Error('Orders app returned ' + res.status);
        });
    };
})();
