import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getDeudas } from '../actions/apiFunctions';
import { connect } from 'react-redux';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { updateLoader } from '../redux/actions';

class PagosPendientesScreen extends React.Component {
  
    state = {
        elements: [],
        tableHead: ['Referencia', 'Valor', 'Acciones'],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleDeudas());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleDeudas = async () => {
        this.props.updateLoader(true);
        const elements = await getDeudas(this.props.casa.id_casa, this.props.usuario.api_key);
        this.setState({elements});
        this.props.updateLoader(false);
    }
    render() {
        const tableData = [];
        for (let i = 0; i < this.state.elements.length; i++) {
            const rowData = [];
            rowData.push(this.state.elements[i].tipo_pago.nombre + ": " + this.state.elements[i].referencia);
            rowData.push("$" + this.state.elements[i].valor);
            rowData.push(this.state.elements[i].id_deuda);
            tableData.push(rowData);
        }
        const button = (data, index) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Pago", {id_deuda: data, token: this.props.usuario.api_key})}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Pagar</Text>
              </View>
            </TouchableOpacity>
          );
        return (
            <View style={styles.container}>
                    <ScrollView>
                        {this.state.elements.length > 0 &&
                        <Table borderStyle={{borderColor: '#fff', borderWidth: 0}}>
                            <Row data={this.state.tableHead} style={styles.header} textStyle={[styles.text, {fontWeight: "bold"}]}/>
                            {
                            tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 2 ? button(cellData, index) : cellData} textStyle={[styles.text, cellIndex === 1 ? styles.total : null]} />
                                    ))
                                    }
                                </TableWrapper>
                            ))
                            }
                        </Table>
                        }
                        {this.state.elements.length == 0 &&
                            <View>
                                <Text style={styles.emptyText}>No cuenta con pagos pendientes.</Text>
                            </View>
                        }
                    </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { height: 50 },
    text: {
        textAlign: 'center',
        fontWeight: '100',
        paddingVertical:5,
        paddingHorizontal: 2
    },
    total:{
        fontSize:18,
    },
    dataWrapper: { marginTop: -1 },
    row: { flexDirection: 'row', backgroundColor: '#EDF4F7' },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    emptyText:{
        padding:10,
        fontStyle:"italic",

    },
  });
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(PagosPendientesScreen);