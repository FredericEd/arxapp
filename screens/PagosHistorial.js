import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { getPagos } from '../actions/apiFunctions';
import { connect } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import { updateLoader } from '../redux/actions';

class PagosHistorial extends React.Component {
  
    state = {
        elements: [],
        tableHead: ['Referencia', 'Fecha de pago', 'Usuario', 'Valor'],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handlePagos());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handlePagos = async () => {
        this.props.updateLoader(true);
        const elements = await getPagos(this.props.casa.id_casa, this.props.usuario.api_key);
        this.setState({elements});
        this.props.updateLoader(false);
    }
    render() {
        const tableData = [];
        for (let i = 0; i < this.state.elements.length; i++) {
            const rowData = [];
            rowData.push(this.state.elements[i].deuda.tipo_pago.nombre + ": " + this.state.elements[i].deuda.referencia);
            rowData.push(this.state.elements[i].fecha);
            rowData.push(this.state.elements[i].usuario.nombre);
            rowData.push("$" + this.state.elements[i].deuda.valor);
            tableData.push(rowData);
        }
        return (
            <View style={styles.container}>
                    <ScrollView>
                        {this.state.elements.length > 0 &&
                        <Table borderStyle={{borderColor: '#fff', borderWidth: 0}}>
                            <Row data={this.state.tableHead} style={styles.header} textStyle={[styles.text, {fontWeight: "bold"}]}/>
                            {
                            tableData.map((rowData, index) => (
                                <Row
                                key={index}
                                data={rowData}
                                style={[styles.row, index%2 && {backgroundColor: '#fff'}]}
                                textStyle={styles.text}
                                />
                            ))
                            }
                        </Table>
                        }
                        {this.state.elements.length == 0 &&
                            <View>
                                <Text style={styles.emptyText}>No cuenta con pagos registrados.</Text>
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
    text: { textAlign: 'center', fontWeight: '100', paddingVertical:5, paddingHorizontal: 2 },
    dataWrapper: { marginTop: -1 },
    row: { backgroundColor: '#EDF4F7', },
    emptyText:{
        padding:10,
        fontStyle:"italic",

    },
  });
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(PagosHistorial);