import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { getVisitantes } from '../actions/apiFunctions';
import { connect } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import { updateLoader } from '../redux/actions';

class VisitantesHistorial extends React.Component {
  
    state = {
        elements: [],
        tableHead: ['Fecha', 'Hora', 'Nombre'],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleVisitantes());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleVisitantes = async () => {
        try {
            this.props.updateLoader(true);
            const elements = await getVisitantes(this.props.casa.id_casa, this.props.usuario.api_key);
            this.setState({elements});
            this.props.updateLoader(false);
        } catch (e) {
            this.props.updateLoader(false);
            Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
        }
    }
    render() {
        const tableData = [];
        for (let i = 0; i < this.state.elements.length; i++) {
            const rowData = [];
            let fecha = this.state.elements[i].fecha.split(" ");
            rowData.push(fecha[0]);
            rowData.push(fecha[1]);
            rowData.push(this.state.elements[i].usuario.nombre);
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
                                    textStyle={styles.text} />
                            ))
                            }
                        </Table>
                        }
                        {this.state.elements.length == 0 &&
                            <View>
                                <Text style={styles.emptyText}>No cuenta con visitantes registrados.</Text>
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
export default connect(mapStateToProps, {updateLoader: updateLoader})(VisitantesHistorial);