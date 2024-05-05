import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Input } from '@ui-kitten/components';
import { colors } from '../assets/colorPallette';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `<html>
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



const PaymentConfirmation = ({ route }) => {
    const { amountPayable, amountReceived, paymentChange, paymentOptions, receiptNumber } = route.params

    const [selectedPrinter, setSelectedPrinter] = useState();

    const print = async () => {
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url, // iOS only
            height: 384,
            width: 192
        });
    }

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };


    const navigate = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-background ">
            <View className="bg-primary p-3 flex-row items-center justify-center">
                <TouchableOpacity className="mr-auto" onPress={() => navigate.goBack()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.primaryContent}
                    />
                </TouchableOpacity>
                <Text className="text-primary-content teaxt-lg mr-auto text-bold">
                    Transaction Complete
                </Text>
            </View>

            <View className="bg-foreground p-3 flex-col items-center justify-start flex-1">
                <View className="py-4 w-full justify-center items-center">
                    <View className="py-5 justify-center items-center border-2 w-full border-border rounded-xl">

                        <Text className="text-secondary-dark font-bold text-7xl">${paymentChange}</Text>
                        <Text className="text-primary-light font-bold text-xl">Change</Text>
                    </View>
                    <View className="py-3 w-full flex-row  justify-evenly items-center">
                        <View>
                            <Text className="text-primary-light font-bold text-xl mb-3"> Amount Payable</Text>
                            <Text className="text-secondary-dark font-bold text-3xl">${amountPayable}</Text>
                        </View>
                        <View>
                            <Text className="text-primary-light font-bold text-xl mb-3"> Amount Received</Text>
                            <Text className="text-secondary-dark font-bold text-3xl">${amountReceived}</Text>

                        </View>

                    </View>
                    <View className="py-5 justify-center items-center">
                        <Text className="text-primary-light font-bold text-xl mb-3"> Payment Option</Text>
                        <Text className="text-secondary-dark font-bold text-6xl">{paymentOptions}</Text>
                    </View>


                </View>
                {/*Button Group*/}
                <View>
                    <Button size='giant' style={{ marginTop: 10, width: 300 }} onPress={() => navigate.navigate("POS")}>
                        <Text className="text-foreground font-bold text-2xl">New Entry</Text>
                    </Button>
                    <Button status='warning' size='giant' style={{ marginTop: 10, width: 300 }} onPress={() => navigate.navigate("ViewReceipt", { receiptNumber: receiptNumber })}>
                        <Text className="text-foreground font-bold text-2xl">Receipt</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentConfirmation

const styles = StyleSheet.create({})

// () => navigate.navigate("ViewReceipt", { receiptNumber: receiptNumber }0