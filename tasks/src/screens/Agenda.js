import React, { Component } from 'react';
import { StyleSheet, 
    Text, 
    ImageBackground, 
    View,
    FlatList,
    Image,
    TouchableOpacity, Platform, Alert, ToastAndroid
    // ,AsyncStorage
} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import emptyImage from '../../assets/imgs/emptyState.jpg'

import commonsStyles from '../commonsStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import { placeholder } from '@babel/types';
import ActionButton from 'react-native-action-button'
import AddTask from './AddTasks'
import axios from 'axios'
import {server, showError} from '../common'

export default class Agenda extends Component {

    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    AddTask = async task => {

        try{
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date
            })
            this.setState({showAddTask: false}, this.loadTasks)
        }catch(err){
            showError(err)
        }

        // ADD TASKS QUANDO SALVANSO NO DISPOSITIVO
        // const tasks = [...this.state.tasks]
        // tasks.push({
        //     id: Math.random(),
        //     desc: task.desc,
        //     estimateAt: task.date,
        //     doneAt: null
        // })
        // this.setState({ tasks, showAddTask: false}, this.filterTasks)
    }

    deleteTesk = async id => {

        // DELETE TASKS QUANDO SALVANSO NO DISPOSITIVO
        // const tasks = this.state.tasks.filter(tasks => tasks.id !== id)
        // this.setState({ tasks }, this.filterTasks)

        try {
            await axios.delete(`${server}/tasks/${id}`)
            this.loadTasks()
        } catch (error) {
            showError(error)            
        }

        if (Platform.OS === 'android'){
            ToastAndroid.show('Excluido com sucesso', ToastAndroid.LONG)
        } else {
            Alert.alert('Sucesso', 'Excluido com sucesso')
        }
    }

    // se showDoneTasks true, copia o array e mostra
    // se showDoneTasks false, joga na variavel pending somente as tasks com doneAt = null
    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pendind = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pendind)
        }
        this.setState({ visibleTasks })
        
        // salvar no dispositivo
        //AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    // inverte o estado showDoneTasks (se for true var ser false, e se for false...)
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks}
            , this.filterTasks)
    }

    // o metodo componentDidMount é chamado quando o componente (Agenda) é renderizado
    componentDidMount = async () => {
        this.loadTasks()

        // pegar do dispositivo
        // const data = await AsyncStorage.getItem('tasks')
        // const tasks = JSON.parse(data) || []
        // this.setState({ tasks }, this.filterTasks)
    }

    loadTasks = async () => {
        try{
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (err) {
            showError(err)
        }
    }

    toggleTask = async id => {
        try{
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()
        }catch(err){
            showError(err)
        }
        
        // PARA QUANDO LOCAL
        // const tasks = [...this.state.tasks]
        // tasks.forEach(task => {
        //     if (task.id === id) {
        //         task.doneAt = task.doneAt ? null : new Date()
        //     }
        // })
        //this.setState({ tasks }, this.filterTasks)
    }

    // COM MAP
    // toggleTask = id => {
    //     const tasks = this.state.tasks.map(task => {
    //         if (task.id === id) {
    //             task = {...task}
    //             task.doneAt = task.doneAt ? null : new Date()
    //         }
    //         return task
    //     })
    //     this.setState({ tasks })
    // }

    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={styles.emptyList}
                style={{ marginTop:50, alignItems: 'center' }}>
            <Image source={emptyImage} />
            <Text style={{ marginTop:20, textAlign: 'center' }}>Sem tarefas!</Text>
          </View>
        );
      };

  render() {

    let styleColor = null
    let image = null

    switch(this.props.daysAhead) {
        case 0:
            styleColor = commonsStyles.colors.today
            image = todayImage
            break
        case 1:
            styleColor = commonsStyles.colors.tomorrow
            image = tomorrowImage
            break
        case 7:
            styleColor = commonsStyles.colors.week
            image = weekImage
            break
        case 30:
            styleColor = commonsStyles.colors.month
            image = monthImage
            break
    }

    return (
        <View style={styles.container}>
            <AddTask isVisible={this.state.showAddTask}
                onSave={this.AddTask}
                onCancel={() => this.setState({ showAddTask: false })} />
            <ImageBackground source={image} 
                style={styles.background}>
                
                {/* icone do toggle e do navigator */}
                <View style={styles.iconBar}>

                    <TouchableOpacity onPress={ () => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={20} color={commonsStyles.colors.secondary} />
                    </TouchableOpacity>

                    {/* clicavel, ao clicar chama a toggleFilter */}
                    <TouchableOpacity onPress={this.toggleFilter}>
                        {/* mostra o olho ou nao (icone) */}
                        <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                            size={20} color={commonsStyles.colors.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}> {this.props.title} </Text>
                    <Text style={styles.subTitle}> 
                        {moment().locale('pt-br').format('ddd, D [de] MMMM')} 
                    </Text>
                </View>
            </ImageBackground>
            
            <View style={styles.taskContainer}>
                
                <FlatList data={this.state.visibleTasks} 
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>     
                        <Task {...item} toggleTask={this.toggleTask}
                            onDelete={this.deleteTesk} />} 
                            ListEmptyComponent={this.ListEmpty} />
            </View> 
            <ActionButton buttonColor={styleColor} 
                        onPress={() => { this.setState({ showAddTask: true }) }} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    emptyList: {
        marginTop: 30,
    },

    background: {
        flex: 3,
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    title: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },

    subTitle: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7,
    },

    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
