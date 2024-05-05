export const html = `<html>
<head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
  />
  <style>
    @page {
      size: 58mm 100mm;
    }
    * {
      font-family: Arial, sans-serif;
      font-size: 0.6rem;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.3rem;
    }
    .text-center {
      text-align: center;
    }
    .grand-total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }
    .divider {
      height: 3px;
      background-color: rgb(44, 41, 41);
      width: 100%;
    }
    .logo {
      width: 100%;
      height: 20vh;
      object-fit: contain;
    }
    .header {
      margin-bottom: 1rem;
      display: block;
      text-align: center;
    }
  </style>
</head>
<body>
  <img
    src="https://firebasestorage.googleapis.com/v0/b/chillnessimg.appspot.com/o/chillnessImg%2FChillnessLogo.png?alt=media&token=0e39c79d-b0ab-44bd-aa82-f01dba572ce3"
    class="logo"
  />
  <div class="header">
    <h2>CHILLNESS BY LAVIOCA</h2>
    <p>One Central Hotel, Corner Leon Kilat, Sanciangko St, Cebu City</p>
    <p>VAT REGISTERED TIN 000-000-000-00000</p>
    <h1>OR NO.: 000000</h1>
  </div>
  <table>
    <thead>
      <tr>
        <th>QTY</th>
        <th>ITEM</th>
        <th class="text-center">PRICE</th>
        <th class="text-center">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      <!-- Dynamically add rows for each order item -->
      <tr>
        <td class="text-center">1</td>
        <td>Item 1</td>
        <td class="text-center">100.00</td>
        <td class="text-center">100.00</td>
      </tr>
    </tbody>
  </table>
  <div class="grand-total">
    <div>
      <p><span style="font-weight: bold">Vatable Sales:</span> 100.00</p>
    </div>
    <div>
      <p><span style="font-weight: bold">Vat:</span> 100.00</p>
    </div>
    <div>
      <p><span style="font-weight: bold">Change:</span> 100.00</p>
    </div>
    <div>
      <p><span style="font-weight: bold">Grand Total:</span> 300.00</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="bottom-section">
    <p><span style="font-weight: bold">How was your experience?</span></p>
    <p>loviocamilkstation.ph</p>
    <p>0916-443-8090</p>
  </div>
</body>
</html>

`;
