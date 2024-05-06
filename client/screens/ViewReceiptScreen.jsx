import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getReceipt } from '../API/orders'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { colors } from '../assets/colorPallette'

import { useNavigation } from '@react-navigation/native'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const ViewReceiptScreen = ({ route }) => {
    const { receiptNumber } = route.params
    const [receiptInfo, setReceiptInfo] = useState({})
    const [error, setError] = useState(null)
    const navigate = useNavigation();

    const [selectedPrinter, setSelectedPrinter] = useState();

    const print = async () => {
        await Print.printAsync({
            html: generateHTML(receiptInfo),
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


    const fetchReceipt = useCallback(async () => {
        try {
            const { receipt, error } = await getReceipt({ receiptNumber });
            if (error) {
                throw new Error(error);
            } else {
                setReceiptInfo(receipt); // Update the state with the receipt object
            }
        } catch (err) {
            setError(err.message);
        }
    }, [receiptNumber])

    useEffect(() => {
        fetchReceipt()
    }, [])

    const orderItems = receiptInfo.orderItems;
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="bg-primary p-3 flex-row items-center justify-between z-10 ">
                <TouchableOpacity className="mr-auto" onPress={() => navigate.goBack()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.primaryContent}
                    />
                </TouchableOpacity>
                <Text className="text-primary-content teaxt-lg mx-auto text-bold">
                    Preview Receipt
                </Text>
                <TouchableOpacity className="ml-auto" onPress={() => print()}>
                    <FontAwesome name="print" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <View style={styles.container}>

                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/chillnessimg.appspot.com/o/chillnessImg%2FChillnessLogo.png?alt=media&token=0e39c79d-b0ab-44bd-aa82-f01dba572ce3' }}
                    style={styles.logo}
                />
                <View style={styles.header}>
                    <Text style={styles.headerText}>CHILLNESS BY LAVIOCA</Text>
                    <Text>One Central Hotel, Corner Leon Kilat, Sanciangko St, Cebu City</Text>
                    <Text>VAT REGISTERED TIN 000-000-000-00000</Text>
                    
                    <Text style={styles.orNo}>OR NO.: {receiptNumber}</Text>
                </View>
                {/* Table */}
                <View style={styles.tableContainer}>
                    {/* Table headers */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.cell, { flex: 1 }]}>QTY</Text>
                        <Text style={[styles.cell, { flex: 3 }]}>ITEM</Text>
                        <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}>PRICE</Text>
                        <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}>Subtotal</Text>
                    </View>
                    {/* Table rows */}
                    {orderItems?.map((item, index) => (
                        <View style={styles.tableRow}>
                            <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}>{item?.quantity}</Text>
                            <Text style={[styles.cell, { flex: 3 }]}>{item?.product.prodName}</Text>
                            <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}>{item?.product.prodPrice} </Text>
                            <Text style={[styles.cell, { flex: 1, textAlign: 'center' }]}> {item?.quantity * item?.product.prodPrice}</Text>
                        </View>
                    ))}
                </View>
                {/* Grand Total */}
                <View style={styles.grandTotal}>
                    <Text>Vatable Sales: 100.00</Text>
                    <Text>Vat: 100.00</Text>
                    <Text>Amount Received: {receiptInfo?.amountReceived}</Text>
                    <Text>Change: {receiptInfo?.amountChange}</Text>
                    <Text>Grand Total: {receiptInfo?.totalAmount}</Text>
                </View>
                {/* Divider */}
                <View style={styles.divider} />
                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <Text style={styles.boldText}>How was your experience?</Text>
                    <Text>loviocamilkstation.ph</Text>
                    <Text>0916-443-8090</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    logo: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    orNo: {
        fontWeight: 'bold',
    },
    tableContainer: {
        width: '100%',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    cell: {
        padding: 5,
    },
    grandTotal: {
        marginBottom: 20,
    },
    divider: {
        height: 3,
        backgroundColor: 'rgb(44, 41, 41)',
        width: '100%',
        marginBottom: 20,
    },
    bottomSection: {
        alignItems: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default ViewReceiptScreen;


const generateHTML = (receiptInfo) => {
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
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
          <img src="https://firebasestorage.googleapis.com/v0/b/chillnessimg.appspot.com/o/chillnessImg%2FChillnessLogo.png?alt=media&token=0e39c79d-b0ab-44bd-aa82-f01dba572ce3" class="logo" />
          <div class="header">
            <h2>CHILLNESS BY LAVIOCA</h2>
            <p>One Central Hotel, Corner Leon Kilat, Sanciangko St, Cebu City</p>
            <p>VAT REGISTERED TIN 000-000-000-00000</p>
            <h1>OR NO.: ${receiptInfo.receiptNumber}</h1>
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
              ${receiptInfo.orderItems.map(item => `
                <tr>
                  <td class="text-center">${item.quantity}</td>
                  <td>${item.product.prodName}</td>
                  <td class="text-center">${item.product.prodPrice}</td>
                  <td class="text-center">${item.quantity * item.product.prodPrice}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="grand-total">
            <div>
              <p><span style="font-weight: bold">Vatable Sales:</span> ${receiptInfo.vatableSales}</p>
            </div>
            <div>
              <p><span style="font-weight: bold">Vat:</span> ${receiptInfo.vat}</p>
            </div>
            <div>
              <p><span style="font-weight: bold">Amount Received:</span> ${receiptInfo.amountReceived}</p>
            </div>
            <div>
              <p><span style="font-weight: bold">Change:</span> ${receiptInfo.amountChange}</p>
            </div>
            <div>
              <p><span style="font-weight: bold">Grand Total:</span> ${receiptInfo.totalAmount}</p>
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
}
