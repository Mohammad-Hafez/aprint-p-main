import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className='container my-3'>
      <h2>Delivery Policy</h2>
      <p>Delivery is free on most orders over €250.00 within Spanish Mainland. This applies to most items, such as roll-to-roll materials, including Banners, Vinyl’s, Fabrics, etc.</p>
      <p>For orders under €250+vat, shipping is €18.50 for most items (exceptions apply. See below).</p>
      <p>The following items do not qualify for free shipping: Pavement signs, Banner frames, Feather flags and accessories, Cafe Barrier Hardware items, Scaffold signs.</p>
      <p>Delivery will be charged on weight due to the nature of the products.</p>

      <h3>Can I use my PayPal address as the delivery address?</h3>
      <p>We always ship to the address you entered on our checkout website, not a stored PayPal address. If the PayPal delivery address differs from the checkout address, we will automatically ship to the order address by default. Please ensure you enter your shipping address at our checkout correctly before paying by PayPal, as we cannot be held responsible for orders going to an incorrect address because of an inconsistency with your PayPal details.</p>

      <h3>Turnaround times on most products</h3>
      <p>Delivery time from placement of an order is normally 5-6 working days on most orders. Turnaround starts from order confirmation, payment, and receipt of correct artwork or approval of proof. If order confirmation and payment occur after 1 pm, the order will be processed the following day, incurring an extra day of production/shipping. On larger orders, these times might increase. If you have an order that has a tight deadline, please get in touch with us prior to ordering.</p>

      <table className='border p-3 w-50 text-center'>
        <caption>Order Placed vs. Order Generally Delivered</caption>
        <thead className='my-1 py-2  border'>
          <tr className=''>
            <th>Order Placed</th>
            <th>Order Generally Delivered</th>
          </tr>
        </thead>
        <tbody>
          <tr className='my-1 border'>
            <td>Monday by 1pm</td>
            <td>Tuesday following week</td>
          </tr>
          <tr className='my-1 border'>
            <td>Tuesday by 1pm</td>
            <td>Wednesday following week</td>
          </tr>
          <tr className='my-1 border'>
            <td>Wednesday by 1pm</td>
            <td>Thursday following week</td>
          </tr>
          <tr className='my-1 border'>
            <td>Thursday by 1pm</td>
            <td>Thursday following week</td>
          </tr>
          <tr className='my-1 border'>
            <td>Friday by 1pm</td>
            <td>Friday following week</td>
          </tr>
        </tbody>
      </table>

      <h3>Express Banners</h3>
      <p>We offer a faster turnaround on banners printed on our smaller format machines. Normally, we can have these delivered to you within a couple of days. If order confirmation and payment occur after 1pm, the order will be processed the following day, incurring an extra day of production/shipping.</p>

      <h3>Cafe Barrier Shipping</h3>
      <p>Each cafe barrier system shipping cost is calculated based on your order size and weight.</p>

      <h3>Vinyl Printing, Static Cling, Window Graphics</h3>
      <p>Delivery times for these items are normally 2-3 working days. Sometimes, if very urgent jobs are required, we are able to move this forward by 1 day, depending on production levels at that present time.</p>

      <h3>Courier Deliveries</h3>
      <p>If for whatever reason the courier fails to deliver your items on time APrint will not be held responsible. Please ensure when ordering that you give us your correct shipping address, as once your order is in the system, it is very difficult for us to change this. Please also make sure that somebody is at the address to sign for your shipment. Normally the courier will try 2 times to deliver. After the 2nd failed attempt, you will have to personally collect from the courier's depot.</p>

      <h3>Signing for Deliveries</h3>
      <p>Couriers will ask for a signature on delivery. Please check all goods before signing for them. Goods signed for are deemed to be ‘delivered as correct and in good condition’, and it can be very difficult for us to assist with any missing or damaged items later.</p>

      <h2>Pricing</h2>
      <p><strong>Spain:</strong></p>
      <ul>
        <li>€18.50 Standard Delivery</li>
        <li>€26.50 Large Items</li>
        <li>(Free delivery for orders over €250+vat*)</li>
        <li>*exclusions apply</li>
      </ul>
      <p><strong>Non-UK Mainland:</strong></p>
      <ul>
        <li>€50 Standard Delivery</li>
      </ul>
      <p><strong>UK Mainland:</strong>
      <br/>
        <span>(Channel Islands, the Isle of Wight, the Isle of Man, the Scilly Islands, the Scottish Highlands & Islands and Northern Ireland)</span>
      </p>
      <ul>
        <li>€40 Standard Delivery</li>
        <li>€60 Large Items</li>
      </ul>
      <p><strong>Mainland Europe:</strong></p>
      <ul>
        <li>€40 Standard Delivery</li>
        <li>€60 Large Items</li>
      </ul>
      <p><strong>Switzerland:</strong></p>
      <ul>
        <li>€60 Standard Delivery</li>
        <li>€80 Large Items</li>
      </ul>
      <p><strong>Scandinavia:</strong></p>
      <ul>
        <li>€60 Standard Delivery</li>
        <li>€80 Large Items</li>
      </ul>
      <p><strong>Rest of the world:</strong></p>
      <p>Please contact us for pricing.</p>
      <p><strong>Worldwide shipping charges:</strong></p>
      <p>Please contact us</p>
    </div>
  );
};

export default ShippingPolicy;
