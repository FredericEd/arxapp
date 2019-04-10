import React from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';
import { Table, Row } from 'react-native-table-component';
import Toast from 'react-native-root-toast';
import { saveReserva } from '../actions/apiFunctions';

class ReservaScreen extends React.Component {
  
    state = {
      fecha: "",
      time: "",
      horas: "1",
      today: "",
      tableHead: ['Día', 'Horario'],
      instalacion: {},
    }
    handleFecha = fecha => this.setState({fecha});
    handleTime = time => this.setState({time});
    handleHoras = horas => this.setState({horas});
    
    handleSaveReserva = async () => {
      try {
        Keyboard.dismiss();
        if (this.state.fecha != "" && this.state.time != "" && this.state.horas != "") {
          this.props.updateLoader(true);
          const response = await saveReserva(this.props.casa.id_casa, this.state.instalacion.id_instalacion, this.state.fecha, this.state.time,this.state.horas ,this.props.usuario.api_key);
          Toast.show(response["message"], {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          response["error"] == false && this.props.navigation.navigate("Pago", {id_instalacion_pedido: response["id"], token: this.props.usuario.api_key});
          this.props.updateLoader(false);
        } else Toast.show("Todos los campos son obligatorios", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
      }
    }
    componentWillMount() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      dd < 10 && (dd = '0' + dd);
      mm < 10 && (mm = '0' + mm);
      const instalacion =  this.props.navigation.state.params.instalacion;
      instalacion.min_horas == instalacion.max_horas && this.setState({horas: instalacion.min_horas});
      this.setState({today: yyyy + mm + dd, instalacion});
    }
    render() {
      const tableData = [];
      for (let horario of this.state.instalacion.horarios) {
        const rowData = [];
        if (typeof horario.hora_inicio != "undefined") {
          rowData.push(horario.caption);
          rowData.push(horario.hora_inicio + "h00 - " + horario.hora_final + "h00");
        } else {
          rowData.push(horario.caption);
          rowData.push("No hay atención.");
        }
        tableData.push(rowData);
      }
      return (
        <ScrollView>
          <View>
            <View style={[styles.row, {flexDirection:"row"}]}>
              <View style={{flex:1}} />
              <Text style={styles.title}>Horarios disponibles</Text>
              <View style={{flex:1}} />
            </View>
            <View style={[styles.row, {flexDirection:"row", paddingBottom: 10}]}>
              <View style={{flex:1}} />
              <Text>${this.state.instalacion.precio} la hora</Text>
              <View style={{flex:1}} />
            </View>
            <View style={styles.separator} />
            <Table borderStyle={{borderColor: '#fff', borderWidth: 0}}>
              <Row data={this.state.tableHead} style={styles.header} textStyle={[styles.text, {fontWeight: "bold"}]}/>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={[styles.row, index%2 && {backgroundColor: '#fff'}]}
                    textStyle={styles.text} />
                ))}
            </Table>
            <View style={styles.separator} />
            <Text style={styles.title}>Datos de la reserva</Text>
            <View style={{padding:5}}>
              <View style={{flexDirection:"row", padding:5}}>
                <Text style={{flex:1, marginTop:10}}>Fecha de la reserva:</Text>
                <DatePicker
                  style={{flex:1}}
                  date={this.state.fecha}
                  mode="date"
                  placeholder="seleccione la fecha"
                  format="YYYY-MM-DD"
                  minDate={this.state.today}
                  confirmBtnText="Aceptar"
                  cancelBtnText="Cancelar"
                  onDateChange={this.handleFecha} />
              </View>
              <View style={{flexDirection:"row", padding:5}}>
                <Text style={{flex:1, marginTop:10}}>Hora de la reserva:</Text>
                    <DatePicker
                      style={{flex:1}}
                      date={this.state.time}
                      mode="time"
                      placeholder="seleccione la hora"
                      format="HH:mm"
                      confirmBtnText="Aceptar"
                      cancelBtnText="Cancelar"
                      onDateChange={this.handleTime} />
              </View>
              {this.state.instalacion.min_horas == this.state.instalacion.max_horas &&
                <Text style={{padding:5, color:"red"}}>La instalación sólo puede ser alquilada por un periodo de {this.state.instalacion.max_horas} hora(s).</Text>
              }
              {this.state.instalacion.min_horas != this.state.instalacion.max_horas &&
              <View style={{flexDirection:"row", padding:5}}>
                <Text style={{flex:1, marginTop:10}}>Cantidad de horas:</Text>
                <TextInput style = {[styles.input, {flex:1}]}
                  placeholder={"de " + this.state.instalacion.min_horas + " a " + this.state.instalacion.max_horas + " horas"}
                  value={this.state.horas}
                  onChangeText={this.handleHoras}
                  keyboardType="number-pad"
                  maxLength = {1} />
              </View>
              }
            </View>
            <TouchableOpacity style={[styles.buttonContainer, {marginBottom:10}]} onPress={this.handleSaveReserva}>
              <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
  const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    title: {
        fontSize: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        fontWeight: "bold",
    },
    separator: {
        height: 2,
        backgroundColor: "lightgray",
        marginBottom: 5,
    },
    input:{
        backgroundColor: 'rgba(225,225,225,0.5)',
        marginVertical: 5,
        padding: 10,
        borderRadius: 2,
        marginLeft: 20,
    },
    header: { height: 40 },
    text: { textAlign: 'center', fontWeight: '100', paddingVertical:5, paddingHorizontal: 2 },
    dataWrapper: { marginTop: -1 },
    row: { backgroundColor: '#EDF4F7', },
  });
const mapStateToProps = state => ({
  usuario: state.usuario,
  casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(ReservaScreen);